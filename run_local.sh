#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Harmony AI Locally (No Docker)...${NC}\n"

# Check for credentials.json
if [ ! -f "credentials.json" ]; then
    echo -e "${RED}❌ credentials.json not found!${NC}"
    echo "Please place your Google Cloud credentials.json file in the root directory."
    exit 1
fi

# Export credentials path
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/credentials.json"
export PROJECT_ID="convrt-common"
export LOCATION="us-west1"

# Function to kill processes on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Stopping services...${NC}"
    kill $(jobs -p) 2>/dev/null
    echo -e "${GREEN}✅ Services stopped.${NC}"
}
trap cleanup EXIT

# --- Backend Setup ---
echo -e "\n${BLUE}🐍 Setting up Backend...${NC}"
cd backend_py

# Export variables from .env
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Set Google Credentials if file exists
# if [ -f "credentials.json" ]; then
#     export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/credentials.json"
#     echo "🔑 Found credentials.json, setting GOOGLE_APPLICATION_CREDENTIALS..."
# fi

# Setup Python Virtual Environment
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install requirements
echo "Installing backend dependencies..."
pip install -r requirements.txt

# Start Backend
echo -e "\n${GREEN}🚀 Starting Backend Server on port 8000...${NC}"
cd .. # Go back to root
export PYTHONPATH=$(pwd)
unset GOOGLE_APPLICATION_CREDENTIALS
uvicorn backend_py.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# --- Frontend Setup ---
echo -e "\n${BLUE}⚛️  Setting up Frontend...${NC}"

# Install node modules if missing
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start Frontend
echo -e "${GREEN}🚀 Starting Frontend Server on port 5173...${NC}"
# Set API_URL for local development
export API_URL="http://localhost:8000"
npm run dev &
FRONTEND_PID=$!

echo -e "\n${GREEN}✅ Both services are running!${NC}"
echo -e "   Frontend: ${BLUE}http://localhost:5173${NC}"
echo -e "   Backend:  ${BLUE}http://localhost:8000/docs${NC}"
echo -e "\n${YELLOW}Press Ctrl+C to stop servers${NC}\n"

# Wait for processes
wait
