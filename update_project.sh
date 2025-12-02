#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔄 Updating Harmony AI Project...${NC}\n"

# Check if there are uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}📝 Found local changes${NC}"
    
    # Pull latest changes first
    echo -e "\n${BLUE}📥 Pulling latest changes from remote...${NC}"
    git pull --rebase
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Pull failed. Please resolve conflicts manually.${NC}"
        exit 1
    fi
    
    # Stage all changes
    echo -e "\n${BLUE}📦 Staging all changes...${NC}"
    git add .
    
    # Create commit with timestamp
    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
    COMMIT_MSG="Update project - $TIMESTAMP"
    
    echo -e "\n${BLUE}💾 Committing changes...${NC}"
    git commit -m "$COMMIT_MSG"
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Commit failed.${NC}"
        exit 1
    fi
    
    # Push changes
    echo -e "\n${BLUE}📤 Pushing changes to remote...${NC}"
    git push
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Push failed. You may need to pull first or check your permissions.${NC}"
        exit 1
    fi
    
    echo -e "\n${GREEN}✅ Changes committed and pushed successfully!${NC}"
else
    echo -e "${YELLOW}ℹ️  No local changes to commit${NC}"
    
    # Still pull latest changes
    echo -e "\n${BLUE}📥 Pulling latest changes from remote...${NC}"
    git pull
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Pull failed.${NC}"
        exit 1
    fi
fi

# Restart Docker containers to apply changes
echo -e "\n${BLUE}🔄 Restarting Docker containers...${NC}"
docker-compose restart

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Docker restart failed. Containers might not be running.${NC}"
    echo -e "${BLUE}💡 Try running: ./start.sh${NC}"
    exit 1
fi

echo -e "\n${GREEN}✅ Project updated successfully!${NC}"
echo -e "\n${BLUE}📍 Your application is running at:${NC}"
echo -e "   Frontend: ${GREEN}http://localhost:5173${NC}"
echo -e "   Backend API Docs: ${GREEN}http://localhost:8000/docs${NC}"
