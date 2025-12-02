# Harmony AI - Quick Start Guide

Welcome! This guide will help you get the Harmony AI project up and running in minutes.

## Prerequisites

You only need **Docker Desktop** installed on your computer:

- **Download Docker Desktop**: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- Install and start Docker Desktop before proceeding

## 🚀 Starting the Project

1. **Open Terminal** (Mac) or **Command Prompt** (Windows)

2. **Navigate to the project folder**:
   ```bash
   cd "/Users/jonathanamitay/Downloads/harmonyai-9315f217 (1)"
   ```

3. **Run the start script**:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

4. **Access the application**:
   - **Frontend**: Open [http://localhost:5173](http://localhost:5173) in your browser
   - **Backend API**: Open [http://localhost:8000/docs](http://localhost:8000/docs) for API documentation

That's it! The project is now running. Any code changes you make will automatically reload.

## 🔄 Updating the Project

To pull the latest changes, commit your work, and push to the repository:

```bash
./update_project.sh
```

This script will:
1. Pull the latest changes from the remote repository
2. Commit all your local changes with a timestamp
3. Push everything to the remote repository
4. Restart the Docker containers

## 🛑 Stopping the Project

To stop the running containers:

```bash
docker-compose down
```

## 📝 Viewing Logs

To see what's happening in the containers:

```bash
docker-compose logs -f
```

Press `Ctrl+C` to stop viewing logs.

## 🔧 Troubleshooting

### Docker is not running
**Error**: `Docker is not running`

**Solution**: Make sure Docker Desktop is open and running. Look for the Docker icon in your system tray/menu bar.

---

### Port already in use
**Error**: `port is already allocated`

**Solution**: Another application is using port 5173 or 8000. Either:
- Stop the other application
- Or change the ports in `docker-compose.yml`

---

### Containers won't start
**Error**: Containers keep restarting or failing

**Solution**:
1. Check the logs: `docker-compose logs`
2. Rebuild containers: `docker-compose up -d --build --force-recreate`
3. If still failing, remove everything and start fresh:
   ```bash
   docker-compose down -v
   ./start.sh
   ```

---

### Changes not reflecting
**Issue**: Code changes aren't showing up

**Solution**:
- **Frontend**: Refresh your browser (Ctrl+R or Cmd+R)
- **Backend**: Check logs to see if the server reloaded: `docker-compose logs backend`
- If still not working, restart: `docker-compose restart`

---

### Git push fails
**Error**: `Push failed` when running update script

**Solution**:
- Make sure you have permission to push to the repository
- Check your internet connection
- You may need to authenticate with GitHub/GitLab

## 💡 Useful Commands

| Command | Description |
|---------|-------------|
| `./start.sh` | Start the entire project |
| `./update_project.sh` | Update and sync with git |
| `docker-compose down` | Stop all containers |
| `docker-compose restart` | Restart containers |
| `docker-compose logs -f` | View live logs |
| `docker-compose ps` | Check container status |
| `docker-compose build` | Rebuild containers |

## 🎯 Development Workflow

1. **Start the project**: `./start.sh`
2. **Make your code changes** - they'll auto-reload!
3. **Test your changes** in the browser
4. **Update and push**: `./update_project.sh`
5. **Repeat!**

## 📞 Need Help?

If you encounter any issues not covered here, check:
- Docker Desktop is running and has enough resources (CPU/Memory)
- You're in the correct project directory
- All files have proper permissions: `chmod +x *.sh`

---

**Happy coding! 🎉**
