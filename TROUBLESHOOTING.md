# Troubleshooting Guide for Docker Setup

## Common Issues and Solutions

### Issue 1: Backend Not Starting

**Symptom**: Backend container exits immediately or shows errors

**Possible Causes**:
1. Missing `credentials.json` file
2. Python dependencies not installed
3. Port 8000 already in use

**Solutions**:

#### Check if credentials.json exists
```bash
ls -la credentials.json
```
If missing, you need to add the Google Cloud credentials file to the project root.

#### Check if port 8000 is in use
```bash
lsof -i :8000
```
If something is using port 8000, kill it:
```bash
kill -9 <PID>
```

#### View backend logs
```bash
docker-compose logs backend
```

---

### Issue 2: Frontend Not Starting

**Symptom**: Frontend container exits or shows build errors

**Possible Causes**:
1. Port 5173 already in use
2. Node modules not properly installed
3. Build errors in the code

**Solutions**:

#### Check if port 5173 is in use
```bash
lsof -i :5173
```
If something is using port 5173, kill it:
```bash
kill -9 <PID>
```

#### View frontend logs
```bash
docker-compose logs frontend
```

#### Rebuild from scratch
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

### Issue 3: Docker Not Running

**Symptom**: Error message "Docker is not running"

**Solution**:
1. Open Docker Desktop application
2. Wait for Docker to fully start (whale icon in menu bar should be steady)
3. Run `./start.sh` again

---

### Issue 4: Permission Denied on Scripts

**Symptom**: `Permission denied` when running `./start.sh` or `./update.sh`

**Solution**:
```bash
chmod +x start.sh update.sh
```

---

### Issue 5: Git Push Fails in update.sh

**Symptom**: "Push failed" error when running `./update.sh`

**Possible Causes**:
1. No git credentials configured
2. No permission to push to repository
3. Branch not set up to track remote

**Solutions**:

#### Configure git credentials
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### Set up remote tracking
```bash
git push --set-upstream origin main
```

#### Check git status
```bash
git status
git remote -v
```

---

### Issue 6: Containers Keep Restarting

**Symptom**: Containers show "Restarting" status

**Solution**:

#### Check logs for errors
```bash
docker-compose logs --tail=50
```

#### Stop and remove everything
```bash
docker-compose down -v
docker-compose up --build
```

---

### Issue 7: Changes Not Hot-Reloading

**Symptom**: Code changes don't appear automatically

**Solutions**:

#### For Frontend:
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check if Vite is running: `docker-compose logs frontend`

#### For Backend:
- Check if uvicorn reload is active: `docker-compose logs backend`
- Should see: "Will watch for changes in these directories"

#### Restart containers
```bash
docker-compose restart
```

---

### Issue 8: "Already up to date" but Code Not Updated

**Symptom**: Git pull says "Already up to date" but expecting new code

**Solution**:
```bash
# Check current branch
git branch

# Fetch all branches
git fetch --all

# Pull from correct branch
git pull origin main
```

---

## Complete Reset (Nuclear Option)

If nothing else works, do a complete reset:

```bash
# Stop and remove all containers, networks, and volumes
docker-compose down -v

# Remove Docker images
docker-compose down --rmi all

# Clean Docker system (removes unused data)
docker system prune -a

# Rebuild everything from scratch
./start.sh
```

---

## Checking System Status

### Check if Docker is running
```bash
docker info
```

### Check running containers
```bash
docker-compose ps
```

### Check all Docker containers
```bash
docker ps -a
```

### Check Docker images
```bash
docker images
```

### View real-time logs
```bash
docker-compose logs -f
```

### View logs for specific service
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## Environment-Specific Issues

### macOS
- Ensure Docker Desktop has enough resources (CPU/Memory)
- Go to Docker Desktop → Preferences → Resources
- Recommended: 4+ CPU cores, 8+ GB RAM

### File Watching Issues
If hot-reload doesn't work on macOS:
- The `CHOKIDAR_USEPOLLING=true` environment variable is already set
- Try restarting Docker Desktop

---

## Getting Help

If you're still stuck:

1. **Check container status**:
   ```bash
   docker-compose ps
   ```

2. **View full logs**:
   ```bash
   docker-compose logs
   ```

3. **Check Docker resources**:
   - Open Docker Desktop
   - Check CPU/Memory usage
   - Ensure enough disk space

4. **Share logs** with the team:
   ```bash
   docker-compose logs > docker-logs.txt
   ```

---

## Quick Reference Commands

| Command | Purpose |
|---------|---------|
| `./start.sh` | Start everything |
| `./update.sh` | Commit, pull, push, restart |
| `docker-compose down` | Stop containers |
| `docker-compose ps` | Check status |
| `docker-compose logs -f` | View live logs |
| `docker-compose restart` | Restart containers |
| `docker-compose build --no-cache` | Rebuild from scratch |
| `docker system prune -a` | Clean up Docker |
