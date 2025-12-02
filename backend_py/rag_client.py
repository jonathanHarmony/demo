import os
import glob
import pandas as pd
import vertexai
from vertexai.preview import rag
from vertexai.generative_models import GenerativeModel, Tool, Content, Part
from vertexai.preview.generative_models import grounding
import time
from typing import Optional, List

class VertexRAGClient:
    """
    A client for managing Vertex AI RAG operations with CSV data.
    Adapted for FastAPI.
    """

    def __init__(self, project_id: str, location: str, corpus_display_name: str):
        self.project_id = project_id
        self.location = location
        self.corpus_display_name = corpus_display_name
        self.corpus_name = None

        print(f"Initializing Vertex AI in {location}...")
        vertexai.init(project=self.project_id, location=self.location)
        self._resolve_corpus()

    def _resolve_corpus(self):
        """Finds existing RAG Corpus or creates a new one."""
        print(f"Resolving RAG Corpus: '{self.corpus_display_name}'...")
        try:
            existing_corpora = rag.list_corpora()
            
            for corpus in existing_corpora:
                if corpus.display_name == self.corpus_display_name:
                    self.corpus_name = corpus.name
                    print(f"Found existing Corpus: {self.corpus_name}")
                    return

            print("Corpus not found. Creating new one...")
            corpus = rag.create_corpus(display_name=self.corpus_display_name)
            self.corpus_name = corpus.name
            print(f"Created new Corpus: {self.corpus_name}")
        except Exception as e:
            print(f"Error resolving corpus: {e}")
            # Fallback or re-raise depending on strictness. 
            # If list_corpora fails due to auth, we want to know.
            if "restricted" in str(e) or "capacity limitation" in str(e):
                print(f"\n!!! CRITICAL ERROR: Region '{self.location}' is restricted. !!!\n")
            raise e

    def _convert_csv_to_semantic_text(self, csv_path: str, dataset_description: str = "") -> str:
        """
        Converts CSV rows to text. INJECTS the description into every row.
        """
        try:
            df = pd.read_csv(csv_path)
        except Exception as e:
            raise ValueError(f"Failed to read CSV: {e}")

        filename = os.path.basename(csv_path)
        # Create processed file in the same directory
        output_path = csv_path.replace(".csv", "_processed.txt")
        
        context_prefix = f"Context: {dataset_description}. " if dataset_description else ""

        with open(output_path, "w", encoding="utf-8") as f:
            for i, row in df.iterrows():
                row_values = ". ".join([f"{col}: {val}" for col, val in row.items()])
                row_str = f"{context_prefix}Source File: {filename}. {row_values}"
                f.write(f"Record {i+1}: {row_str}\n\n")
        
        return output_path

    def ingest_csv(self, file_path: str, dataset_description: str = ""):
        """Uploads a single CSV file."""
        if not self.corpus_name: 
            # Try to resolve again if missing
            self._resolve_corpus()
            if not self.corpus_name:
                raise ValueError("Corpus not initialized.")
        
        print(f"Processing & Ingesting CSV: {file_path}")
        
        processed_file_path = self._convert_csv_to_semantic_text(file_path, dataset_description)
        
        try:
            rag_file = rag.upload_file(
                corpus_name=self.corpus_name,
                path=processed_file_path,
                display_name=os.path.basename(file_path),
                description=dataset_description or "Imported CSV Data"
            )
            print(f"Successfully uploaded: {rag_file.name}")
            # Cleanup processed file
            if os.path.exists(processed_file_path): 
                os.remove(processed_file_path)
            return rag_file
        except Exception as e:
            print(f"Upload failed for {file_path}: {e}")
            # Cleanup on failure too
            if os.path.exists(processed_file_path): 
                os.remove(processed_file_path)
            raise e

    def list_files(self):
        """List all files currently in the corpus."""
        if not self.corpus_name: return []
        return list(rag.list_files(corpus_name=self.corpus_name))

    def query(self, prompt: str, model_id: str = "gemini-1.5-pro", similarity_top_k: int = 15, history: List[dict] = None, slide_context: str = ""):
        """Queries the RAG corpus with optional slide context."""
        print(f"\n{'='*80}")
        print(f"[RAG CLIENT] Starting query...")
        print(f"[RAG CLIENT] Model: {model_id}")
        print(f"[RAG CLIENT] Prompt: {prompt[:100]}...")
        print(f"[RAG CLIENT] History messages: {len(history) if history else 0}")
        print(f"[RAG CLIENT] Slide context length: {len(slide_context)} chars")
        
        if not self.corpus_name:
            print(f"[RAG CLIENT ERROR] Corpus not initialized!")
            raise ValueError("Corpus not initialized.")
        
        print(f"[RAG CLIENT] Creating RAG tool with corpus: {self.corpus_name}")
        try:
            rag_tool = Tool.from_retrieval(
                retrieval=rag.Retrieval(
                    source=rag.VertexRagStore(
                        rag_resources=[rag.RagResource(rag_corpus=self.corpus_name)],
                        similarity_top_k=similarity_top_k,
                        vector_distance_threshold=0.4 
                    )
                )
            )
            print(f"[RAG CLIENT] RAG tool created successfully")
        except Exception as e:
            print(f"[RAG CLIENT ERROR] Failed to create RAG tool: {e}")
            raise

        # Detect language based on latest user message (Hebrew vs English)
        def _detect_language(prompt_text: str, history_items):
            text = prompt_text or ""
            if history_items:
                for msg in reversed(history_items):
                    try:
                        if getattr(msg, "role", msg.get("role")) == "user":
                            text = getattr(msg, "content", msg.get("content", "")) or text
                            break
                    except Exception:
                        continue

            # Simple check for Hebrew unicode range
            for ch in text:
                if "\u0590" <= ch <= "\u05FF":
                    return "he"
            return "en"

        user_language = _detect_language(prompt, history)

        if user_language == "he":
            language_line = "1. Answer in Hebrew ONLY."
            cite_slides = "מהשקופיות"
            cite_data = "מהנתונים"
            cite_general = "על בסיס ידע כללי"
        else:
            language_line = "1. Answer in English ONLY."
            cite_slides = "from slides"
            cite_data = "from data"
            cite_general = "based on general knowledge"

        # Build system instruction with prioritization logic and dynamic language
        system_instruction = f"""You are a Data Analyst expert with access to multiple knowledge sources.
                {language_line}
                
                2. INFORMATION SOURCES (in priority order):
                   a) SLIDE CONTENT (Primary): Information from presentation slides - check this FIRST
                   b) RAG DATA (Secondary): Underlying raw data from uploaded files
                   c) GENERAL KNOWLEDGE (Tertiary): Your built-in knowledge and ability to reason
                
                3. ANSWERING STRATEGY:
                   - First check if the SLIDE CONTENT contains the answer → cite "{cite_slides}"
                   - If not sufficient, check RAG DATA from uploaded files → cite "{cite_data}"
                   - If still not found, use your GENERAL KNOWLEDGE → cite "{cite_general}"
                   - You can combine multiple sources when appropriate
                
                4. IMPORTANT GUIDELINES:
                   - If the information is NOT in the slides or RAG data, clearly state this and then provide an answer using your general knowledge
                   - Don't refuse to answer just because the data isn't in the provided sources
                   - Always try to be helpful and provide the best answer possible
                   - When using general knowledge, acknowledge that it's not from the specific report data
                
                5. Context Clarification: When the user asks about "milk" (חלב) in the context of this report, they are referring to cow-free / remilk / alternative milk products, NOT regular cow milk.
                
                6. Citation Rules: DO NOT mention specific 'Source File' names, 'Record' numbers, or CSV filenames. Keep sources anonymous.
                """

        print(f"[RAG CLIENT] Creating GenerativeModel...")
        try:
            model = GenerativeModel(
                model_name=model_id,
                tools=[rag_tool],
                system_instruction=system_instruction
            )
            print(f"[RAG CLIENT] GenerativeModel created successfully")
            
            # Convert history to Content objects if provided
            print(f"[RAG CLIENT] Converting chat history...")
            chat_history = []
            if history:
                for msg in history:
                    # Map 'assistant' to 'model' for Vertex AI
                    role = "model" if msg.role == "assistant" else "user"
                    chat_history.append(Content(role=role, parts=[Part.from_text(msg.content)]))
                print(f"[RAG CLIENT] Converted {len(chat_history)} history messages")
            else:
                print(f"[RAG CLIENT] No history to convert")
            
            # Prepend slide context to the prompt if provided
            print(f"[RAG CLIENT] Preparing prompt...")
            enhanced_prompt = prompt
            if slide_context:
                print(f"[RAG CLIENT] Adding slide context to prompt")
                enhanced_prompt = f"""SLIDE CONTENT (Primary Source - Use this first):
{slide_context}

---

USER QUESTION:
{prompt}"""
            else:
                print(f"[RAG CLIENT] No slide context provided")
            
            print(f"[RAG CLIENT] Starting chat session...")
            chat = model.start_chat(history=chat_history)
            print(f"[RAG CLIENT] Sending message to model...")
            response = chat.send_message(enhanced_prompt)
            print(f"[RAG CLIENT] Received response from model")
            print(f"[RAG CLIENT] Response length: {len(response.text)} chars")
            print(f"{'='*80}\n")
            return response.text
        except Exception as e:
            print(f"[RAG CLIENT ERROR] Exception occurred: {type(e).__name__}")
            print(f"[RAG CLIENT ERROR] Error message: {str(e)}")
            import traceback
            print(f"[RAG CLIENT ERROR] Traceback:")
            traceback.print_exc()
            print(f"{'='*80}\n")
            
            # if "not found" in str(e).lower() and model_id != "gemini-1.5-pro":
            #     print(f"[RAG CLIENT] Model '{model_id}' not found. Retrying with 'gemini-1.5-pro'...")
            #     return self.query(prompt, model_id="gemini-1.5-pro", similarity_top_k=similarity_top_k, history=history, slide_context=slide_context)
            print(f"[RAG CLIENT CRITICAL ERROR] Query failed with model {model_id}. Error: {e}")
            raise e

    def playground_query(self, prompt: str, history: List[dict] = None, model_id: str = "gemini-2.5-pro"):
        """
        Queries Gemini with Research Consultant system instruction for the playground.
        Does NOT use RAG - this is a pure chat experience.
        """
        print(f"\n{'='*80}")
        print(f"[PLAYGROUND] Starting playground query...")
        print(f"[PLAYGROUND] Model: {model_id}")
        print(f"[PLAYGROUND] Prompt: {prompt[:100]}...")
        print(f"[PLAYGROUND] History messages: {len(history) if history else 0}")
        
        # Research Consultant System Instruction
        system_instruction = """You are an expert Senior Market Research Consultant. Your goal is to help users build professional, unbiased, and effective market research studies (surveys, focus groups, etc.).

Your Responsibilities:

1. Clarify Objectives First: Do not generate questions until you understand the Goal (e.g., pricing, brand health, concept testing) and the Target Audience. If the user is vague, ask clarifying questions.

2. Guard Against Bias: If the user asks for a leading question (e.g., 'Ask them if they love our amazing flavor'), politely correct it to be neutral (e.g., 'How would you rate the flavor?').

3. Enforce Best Practices:
   - Use standard scales (5-point Likert, Top-2-Box Purchase Intent) for comparability
   - Avoid double-barreled questions (asking two things at once)
   - Keep surveys short to reduce respondent fatigue

4. Format Output: When presenting a questionnaire draft, use clear Markdown with bold headers for sections (e.g., **Screening**, **Core Questions**, **Demographics**).

5. Source Your Logic: When you suggest a specific methodology, briefly explain why (e.g., 'I recommend a Monadic test here so respondents aren't biased by comparing two options directly').

6. Language Matching: When the user communicates in Hebrew, respond in Hebrew. When in English, respond in English. Match the user's language naturally."""

        print(f"[PLAYGROUND] Creating GenerativeModel...")
        try:
            model = GenerativeModel(
                model_name=model_id,
                system_instruction=system_instruction
            )
            print(f"[PLAYGROUND] GenerativeModel created successfully")
            
            # Convert history to Content objects if provided
            print(f"[PLAYGROUND] Converting chat history...")
            chat_history = []
            if history:
                for msg in history:
                    # Map 'assistant' to 'model' for Vertex AI
                    role = "model" if msg.role == "assistant" else "user"
                    chat_history.append(Content(role=role, parts=[Part.from_text(msg.content)]))
                print(f"[PLAYGROUND] Converted {len(chat_history)} history messages")
            else:
                print(f"[PLAYGROUND] No history to convert")
            
            print(f"[PLAYGROUND] Starting chat session...")
            chat = model.start_chat(history=chat_history)
            print(f"[PLAYGROUND] Sending message to model...")
            response = chat.send_message(prompt)
            print(f"[PLAYGROUND] Received response from model")
            print(f"[PLAYGROUND] Response length: {len(response.text)} chars")
            print(f"{'='*80}\n")
            return response.text
        except Exception as e:
            print(f"[PLAYGROUND ERROR] Exception occurred: {type(e).__name__}")
            print(f"[PLAYGROUND ERROR] Error message: {str(e)}")
            import traceback
            print(f"[PLAYGROUND ERROR] Traceback:")
            traceback.print_exc()
            print(f"{'='*80}\n")
            
            # Fallback to a stable model if the requested one fails
            # if "not found" in str(e).lower() and model_id != "gemini-2.5-pro":
            #     print(f"[PLAYGROUND] Model '{model_id}' not found. Retrying with 'gemini-2.5-pro'...")
            #     return self.playground_query(prompt, history=history, model_id="gemini-2.5-pro")
            print(f"[PLAYGROUND CRITICAL ERROR] Query failed with model {model_id}. Error: {e}")
            raise e

    def generate_report_components(self, question: str, model_id: str = "gemini-2.5-pro"):
        """
        Generates modular report components with structured JSON output.
        Returns components in the exact format expected by the frontend.
        """
        print(f"\n{'='*80}")
        print(f"[REPORT GENERATION] Starting report generation...")
        print(f"[REPORT GENERATION] Model: {model_id}")
        print(f"[REPORT GENERATION] Question: {question}")
        
        system_instruction = """You are an expert data analyst creating modular research reports.
        
Your task is to generate 4-5 distinct analytical components that form a comprehensive research report.

IMPORTANT RULES:
1. Each component must have REALISTIC, DETAILED data
2. For charts/tables: Use the "items" array format with objects containing "name" and "value" fields
3. For text/headlines: Use the "content" string format
4. Include a narrative analysis for each component
5. Mix quantitative (charts) and qualitative (text) components
6. Make the data relevant to the research question

OUTPUT FORMAT:
Return a JSON object with a "components" array. Each component must have:
- id: unique string identifier
- title: clear, descriptive title
- data_source: one of ["social", "news", "reviews", "search"]
- width: one of ["full", "half", "third"]
- visualization: object with "type" field (bar, line, area, pie, table, text, headline)
- narrative: object with "enabled": true
- result: object with:
  - visualization_data: object with "items" array for charts OR "content" string for text
  - narrative: string with analysis

EXAMPLE CHART COMPONENT:
{
  "id": "comp_123",
  "title": "Market Share Distribution",
  "data_source": "social",
  "width": "half",
  "visualization": {"type": "bar"},
  "narrative": {"enabled": true},
  "result": {
    "visualization_data": {
      "items": [
        {"name": "Brand A", "value": 45},
        {"name": "Brand B", "value": 30},
        {"name": "Brand C", "value": 25}
      ]
    },
    "narrative": "Brand A leads the market with 45% share, followed by Brand B at 30%."
  }
}

EXAMPLE TEXT COMPONENT:
{
  "id": "comp_456",
  "title": "Executive Summary",
  "data_source": "social",
  "width": "full",
  "visualization": {"type": "text"},
  "narrative": {"enabled": true},
  "result": {
    "visualization_data": {"content": "This research reveals key insights about..."},
    "narrative": "The analysis shows significant trends in consumer behavior."
  }
}"""

        try:
            print(f"[REPORT GENERATION] Creating GenerativeModel...")
            model = GenerativeModel(
                model_name=model_id,
                system_instruction=system_instruction,
                generation_config={
                    "response_mime_type": "application/json"
                }
            )
            print(f"[REPORT GENERATION] Model created successfully")
            
            prompt = f"""Generate a comprehensive modular research report for: "{question}"

Create 4-5 distinct components that analyze different aspects of this topic.
Include a mix of:
- Bar/line/pie charts with realistic data
- Tables with detailed information
- Text analysis sections
- A headline or summary

Make the data specific and relevant to the question. Return ONLY valid JSON."""

            print(f"[REPORT GENERATION] Sending request to model...")
            response = model.generate_content(prompt)
            print(f"[REPORT GENERATION] Received response")
            
            # Log raw response for debugging
            raw_text = response.text
            print(f"[REPORT GENERATION] Raw response length: {len(raw_text)}")
            print(f"[REPORT GENERATION] Raw response preview: {raw_text[:500]}...")
            
            import json
            import re
            
            # Clean markdown code blocks if present
            cleaned_text = raw_text.strip()
            if cleaned_text.startswith("```json"):
                cleaned_text = cleaned_text[7:]
            if cleaned_text.startswith("```"):
                cleaned_text = cleaned_text[3:]
            if cleaned_text.endswith("```"):
                cleaned_text = cleaned_text[:-3]
            
            cleaned_text = cleaned_text.strip()
            
            try:
                result = json.loads(cleaned_text)
                print(f"[REPORT GENERATION] Successfully parsed JSON response")
                print(f"[REPORT GENERATION] Generated {len(result.get('components', []))} components")
                print(f"{'='*80}\n")
                return result
            except json.JSONDecodeError as json_err:
                print(f"[REPORT GENERATION ERROR] JSON Parsing Failed!")
                print(f"[REPORT GENERATION ERROR] Error: {str(json_err)}")
                print(f"[REPORT GENERATION ERROR] Cleaned text preview: {cleaned_text[:500]}...")
                # Try to fix common JSON issues or just fail gracefully
                raise HTTPException(status_code=500, detail=f"Invalid JSON from LLM: {str(json_err)}")
                
        except Exception as e:
            print(f"[REPORT GENERATION ERROR] Exception occurred: {type(e).__name__}")
            print(f"[REPORT GENERATION ERROR] Error message: {str(e)}")
            import traceback
            print(f"[REPORT GENERATION ERROR] Traceback:")
            traceback.print_exc()
            print(f"{'='*80}\n")
            
            # Fallback to a stable model if needed
            # if "not found" in str(e).lower() and model_id != "gemini-2.5-pro":
            #     print(f"[REPORT GENERATION] Model '{model_id}' not found. Retrying with 'gemini-2.5-pro'...")
            #     return self.generate_report_components(question, model_id="gemini-2.5-pro")
            print(f"[REPORT GENERATION CRITICAL ERROR] Generation failed with model {model_id}. Error: {e}")
            raise e
