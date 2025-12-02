from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
import shutil
import tempfile
import json
import glob
from datetime import datetime
from contextlib import asynccontextmanager

from .rag_client import VertexRAGClient

# Configuration
PROJECT_ID = os.getenv("PROJECT_ID", "convrt-common")
LOCATION = os.getenv("LOCATION", "us-west1")
CORPUS_DISPLAY_NAME = os.getenv("CORPUS_DISPLAY_NAME", "multi-csv-corpus")
CHAT_HISTORY_DIR = os.path.join(os.path.dirname(__file__), "chat_history")

# Create chat history directory if it doesn't exist
os.makedirs(CHAT_HISTORY_DIR, exist_ok=True)

# Global Client Instance
rag_client: VertexRAGClient = None
rag_clients = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    global rag_client
    try:
        rag_client = VertexRAGClient(
            project_id=PROJECT_ID,
            location=LOCATION,
            corpus_display_name=CORPUS_DISPLAY_NAME
        )
    except Exception as e:
        print(f"Failed to initialize RAG client: {e}")
    yield
    # Cleanup if needed

app = FastAPI(lifespan=lifespan)

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request, call_next):
    print(f"\n[MIDDLEWARE] Incoming request: {request.method} {request.url}")
    print(f"[MIDDLEWARE] Origin: {request.headers.get('origin')}")
    try:
        response = await call_next(request)
        print(f"[MIDDLEWARE] Response status: {response.status_code}")
        return response
    except Exception as e:
        print(f"[MIDDLEWARE] Request failed: {str(e)}")
        raise e

"""Dependency and client management"""

def get_rag_client():
    if not rag_client:
        raise HTTPException(status_code=503, detail="RAG Client not initialized")
    return rag_client


def get_or_create_rag_client(report_id: str | None):
    global rag_client, rag_clients
    if not report_id or report_id == "default":
        if not rag_client:
            raise HTTPException(status_code=503, detail="RAG Client not initialized")
        return rag_client

    if report_id in rag_clients:
        return rag_clients[report_id]

    corpus_display_name = f"{CORPUS_DISPLAY_NAME}-{report_id}"
    client = VertexRAGClient(
        project_id=PROJECT_ID,
        location=LOCATION,
        corpus_display_name=corpus_display_name,
    )
    rag_clients[report_id] = client
    return client

# --- Routers ---

# Admin Router
admin_router = APIRouter(prefix="/admin", tags=["admin"])

@admin_router.post("/upload")
async def upload_file(
    file: UploadFile = File(...), 
    description: str = "",
    report_id: str | None = None,
):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only .csv files are supported")

    # Save to temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".csv") as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        # We pass the original filename as part of description or just handle it in ingest
        # The ingest_csv uses os.path.basename(file_path) for display_name.
        # So we might want to rename the temp file to the original name or pass display_name explicitly.
        # Let's rename the temp file to have the original name in a temp dir.
        
        temp_dir = os.path.dirname(tmp_path)
        original_name_path = os.path.join(temp_dir, file.filename)
        os.rename(tmp_path, original_name_path)
        
        client = get_or_create_rag_client(report_id)
        client.ingest_csv(original_name_path, dataset_description=description)
        
        # Clean up the renamed file
        if os.path.exists(original_name_path):
            os.remove(original_name_path)
            
        return {"message": f"Successfully uploaded {file.filename}"}
    except Exception as e:
        # Clean up if something failed and file still exists
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        raise HTTPException(status_code=500, detail=str(e))

@admin_router.get("/files")
async def list_files(client: VertexRAGClient = Depends(get_rag_client)):
    try:
        files = client.list_files()
        # Convert rag files to serializable format if needed
        return {"files": [f.display_name for f in files]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Chat Router
chat_router = APIRouter(prefix="/chat", tags=["chat"])

class Message(BaseModel):
    role: str
    content: str

class QueryRequest(BaseModel):
    prompt: str
    model_id: str = "gemini-2.5-pro"
    history: List[Message] = []
    slide_context: str = ""
    report_id: str | None = None

@chat_router.post("/query")
async def query_rag(request: QueryRequest):
    print(f"\n[ENDPOINT] Received chat query request")
    print(f"[ENDPOINT] Prompt: {request.prompt[:100]}...")
    print(f"[ENDPOINT] Model: {request.model_id}")
    print(f"[ENDPOINT] History length: {len(request.history)}")
    print(f"[ENDPOINT] Slide context length: {len(request.slide_context)}")
    print(f"[ENDPOINT] Report ID: {request.report_id}")
    
    try:
        client = get_or_create_rag_client(request.report_id)
        response = client.query(
            request.prompt, 
            model_id=request.model_id, 
            history=request.history,
            slide_context=request.slide_context
        )
        print(f"[ENDPOINT] Query successful, returning response")
        return {"response": response}
    except Exception as e:
        print(f"[ENDPOINT ERROR] Exception in query endpoint: {type(e).__name__}")
        print(f"[ENDPOINT ERROR] Error message: {str(e)}")
        import traceback
        print(f"[ENDPOINT ERROR] Full traceback:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

class ChatHistory(BaseModel):
    session_id: str
    messages: List[Message]

@chat_router.post("/history/save")
async def save_chat_history(history: ChatHistory):
    """Save chat history to a JSON file"""
    try:
        file_path = os.path.join(CHAT_HISTORY_DIR, f"{history.session_id}.json")
        history_data = {
            "session_id": history.session_id,
            "messages": [msg.dict() for msg in history.messages],
            "last_updated": datetime.now().isoformat()
        }
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(history_data, f, ensure_ascii=False, indent=2)
        return {"message": "Chat history saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@chat_router.get("/history/{session_id}")
async def load_chat_history(session_id: str):
    """Load chat history from a JSON file"""
    try:
        file_path = os.path.join(CHAT_HISTORY_DIR, f"{session_id}.json")
        if not os.path.exists(file_path):
            return {"messages": []}
        
        with open(file_path, 'r', encoding='utf-8') as f:
            history_data = json.load(f)
        
        return {"messages": history_data.get("messages", [])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Playground Router
playground_router = APIRouter(prefix="/playground", tags=["playground"])

PLAYGROUND_HISTORY_DIR = os.path.join(os.path.dirname(__file__), "chat_history", "playground")
os.makedirs(PLAYGROUND_HISTORY_DIR, exist_ok=True)

class PlaygroundQueryRequest(BaseModel):
    prompt: str
    session_id: str
    model_id: str = "gemini-2.5-pro"
    history: List[Message] = []

@playground_router.post("/query")
async def playground_query(request: PlaygroundQueryRequest, client: VertexRAGClient = Depends(get_rag_client)):
    """Query with Research Consultant system instruction"""
    print(f"\n[PLAYGROUND ENDPOINT] Received query request")
    print(f"[PLAYGROUND ENDPOINT] Session ID: {request.session_id}")
    print(f"[PLAYGROUND ENDPOINT] Prompt: {request.prompt[:100]}...")
    print(f"[PLAYGROUND ENDPOINT] Model: {request.model_id}")
    print(f"[PLAYGROUND ENDPOINT] History length: {len(request.history)}")
    
    try:
        response = client.playground_query(
            request.prompt,
            history=request.history,
            model_id=request.model_id
        )
        print(f"[PLAYGROUND ENDPOINT] Query successful")
        return {"response": response}
    except Exception as e:
        print(f"[PLAYGROUND ENDPOINT ERROR] {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

class PlaygroundSession(BaseModel):
    id: str
    title: str
    messages: List[Message]
    created_at: str
    updated_at: str
    language: str = "en"

@playground_router.post("/sessions/save")
async def save_playground_session(session: PlaygroundSession):
    """Save a playground session"""
    print(f"\n[PLAYGROUND SAVE] Saving session: {session.id}")
    print(f"[PLAYGROUND SAVE] Title: {session.title}")
    print(f"[PLAYGROUND SAVE] Messages: {len(session.messages)}")
    try:
        file_path = os.path.join(PLAYGROUND_HISTORY_DIR, f"{session.id}.json")
        print(f"[PLAYGROUND SAVE] File path: {file_path}")
        session_data = session.dict()
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(session_data, f, ensure_ascii=False, indent=2)
        print(f"[PLAYGROUND SAVE] Session saved successfully")
        return {"message": "Session saved successfully"}
    except Exception as e:
        print(f"[PLAYGROUND SAVE ERROR] {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@playground_router.get("/sessions")
async def list_playground_sessions():
    """List all playground sessions"""
    print(f"\n[PLAYGROUND SESSIONS] Listing sessions...")
    print(f"[PLAYGROUND SESSIONS] Directory: {PLAYGROUND_HISTORY_DIR}")
    try:
        sessions = []
        pattern = os.path.join(PLAYGROUND_HISTORY_DIR, "*.json")
        print(f"[PLAYGROUND SESSIONS] Glob pattern: {pattern}")
        files = glob.glob(pattern)
        print(f"[PLAYGROUND SESSIONS] Found {len(files)} files")
        
        for file_path in files:
            print(f"[PLAYGROUND SESSIONS] Processing file: {file_path}")
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    session_data = json.load(f)
                    # Return summary info only
                    session_summary = {
                        "id": session_data.get("id"),
                        "title": session_data.get("title"),
                        "created_at": session_data.get("created_at"),
                        "updated_at": session_data.get("updated_at"),
                        "message_count": len(session_data.get("messages", []))
                    }
                    print(f"[PLAYGROUND SESSIONS] Session: {session_summary}")
                    sessions.append(session_summary)
            except Exception as file_error:
                print(f"[PLAYGROUND SESSIONS ERROR] Failed to process {file_path}: {str(file_error)}")
                continue
        
        # Sort by updated_at descending
        sessions.sort(key=lambda x: x.get("updated_at", ""), reverse=True)
        print(f"[PLAYGROUND SESSIONS] Returning {len(sessions)} sessions")
        return {"sessions": sessions}
    except Exception as e:
        print(f"[PLAYGROUND SESSIONS ERROR] {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@playground_router.get("/sessions/{session_id}")
async def get_playground_session(session_id: str):
    """Get a specific playground session"""
    print(f"\n[PLAYGROUND GET SESSION] Fetching session: {session_id}")
    try:
        file_path = os.path.join(PLAYGROUND_HISTORY_DIR, f"{session_id}.json")
        print(f"[PLAYGROUND GET SESSION] File path: {file_path}")
        print(f"[PLAYGROUND GET SESSION] File exists: {os.path.exists(file_path)}")
        
        if not os.path.exists(file_path):
            print(f"[PLAYGROUND GET SESSION] Session not found: {session_id}")
            raise HTTPException(status_code=404, detail="Session not found")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            session_data = json.load(f)
        print(f"[PLAYGROUND GET SESSION] Loaded session with {len(session_data.get('messages', []))} messages")
        return session_data
    except HTTPException:
        raise
    except Exception as e:
        print(f"[PLAYGROUND GET SESSION ERROR] {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@playground_router.delete("/sessions/{session_id}")
async def delete_playground_session(session_id: str):
    """Delete a playground session"""
    try:
        file_path = os.path.join(PLAYGROUND_HISTORY_DIR, f"{session_id}.json")
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="Session not found")
        
        os.remove(file_path)
        return {"message": "Session deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Report Router
report_router = APIRouter(prefix="/report", tags=["report"])

class ReportGenerateRequest(BaseModel):
    question: str
    model_id: str = "gemini-2.5-pro"

@report_router.post("/generate")
async def generate_report(request: ReportGenerateRequest, client: VertexRAGClient = Depends(get_rag_client)):
    """Generate modular report components using Gemini"""
    print(f"\n[REPORT ENDPOINT] Received report generation request")
    print(f"[REPORT ENDPOINT] Question: {request.question}")
    print(f"[REPORT ENDPOINT] Model: {request.model_id}")
    
    try:
        result = client.generate_report_components(
            question=request.question,
            model_id=request.model_id
        )
        print(f"[REPORT ENDPOINT] Successfully generated report")
        return result
    except Exception as e:
        print(f"[REPORT ENDPOINT ERROR] {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# Include Routers
app.include_router(admin_router)
app.include_router(chat_router)
app.include_router(playground_router)
app.include_router(report_router)

@app.get("/")
def read_root():
    return {"message": "Vertex AI RAG Backend is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "chat_history_dir": CHAT_HISTORY_DIR, "playground_history_dir": PLAYGROUND_HISTORY_DIR}
