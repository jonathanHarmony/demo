#!/bin/bash

# Ensure the script exits if any command fails
set -e

echo "🚀 Starting application..."

# Start the containers
# -d: Detached mode (optional, but usually better for "run" scripts so it doesn't block terminal, 
#     but user might want to see logs. Let's keep it attached for now as per previous behavior).
docker-compose up

# If you want to run in background, use:
# docker-compose up -d
