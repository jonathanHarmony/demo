#!/bin/bash

# Ensure the script exits if any command fails
set -e

echo "🚀 Starting update process..."

# 1. Update the project (Pull latest code)
echo "📥 Pulling latest changes from git..."
#git pull

# 2. Redo the docker (Rebuild and start)
echo "🐳 Rebuilding and starting Docker containers..."
# Stop existing containers to ensure a clean restart
docker-compose down

# Build and start
# --build: Build images before starting containers.
docker-compose up --build

echo "✅ Update and startup complete!"
