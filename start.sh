#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Harmony AI Project...${NC}\n"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker Desktop and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker is running${NC}"

# Pull latest changes from git
echo -e "\n${BLUE}📥 Pulling latest changes from git...${NC}"
git pull

# Build and start containers
echo -e "\n${BLUE}🏗️  Building and starting containers...${NC}"
docker-compose up -d --build

# Wait for services to be ready
echo -e "\n${YELLOW}⏳ Waiting for services to start...${NC}"
sleep 5

# Check container status
echo -e "\n${BLUE}📊 Container Status:${NC}"
docker-compose ps

# Show logs
echo -e "\n${GREEN}✅ Project started successfully!${NC}"
echo -e "\n${BLUE}📍 Access your application:${NC}"
echo -e "   Frontend: ${GREEN}http://localhost:5173${NC}"
echo -e "   Backend API Docs: ${GREEN}http://localhost:8000/docs${NC}"
echo -e "\n${YELLOW}💡 Tips:${NC}"
echo -e "   - Code changes will automatically reload"
echo -e "   - View logs: ${BLUE}docker-compose logs -f${NC}"
echo -e "   - Stop project: ${BLUE}docker-compose down${NC}"
echo -e "\n${BLUE}📝 Showing logs (Ctrl+C to exit):${NC}\n"

# Follow logs
docker-compose logs -f
