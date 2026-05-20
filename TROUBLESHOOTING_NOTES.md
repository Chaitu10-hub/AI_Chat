# Troubleshooting Notes

This file documents the major issues encountered during development and how they were resolved.  
It is included for transparency and to demonstrate debugging and engineering decisions.

---

## 1. Ollama Port Conflict (Port 11434)

### Error
Error: listen tcp 127.0.0.1:11434: bind: Only one usage of each socket address is normally permitted

### Cause
Multiple Ollama processes were running at the same time:
- Ollama Desktop
- `ollama serve` (manual)
- Docker Ollama container

All were trying to use port **11434**, causing a conflict.

### Solution
- Closed Docker Desktop  
- Stopped all containers (`docker compose down`)  
- Killed all Ollama processes:
taskkill /F /IM "ollama.exe"
taskkill /F /IM "ollama app.exe"
- Verified port was free:
netstat -ano | findstr 11434
- Restarted Ollama manually:
ollama serve

---

## 2. Backend Timeout Error (host.docker.internal)

### Error
HTTPConnectionPool(host='host.docker.internal', port=11434): Max retries exceeded...

### Cause
Backend was still pointing to:
http://host.docker.internal:11434
This hostname only works **inside Docker containers**.
When running manually, it must use:http://localhost:11434

### Solution
Updated backend code:OLLAMA_URL = "http://localhost:11434/api/generate"


---


---

## 3. Docker vs Manual Mode Conflict

### Issue
Switching between Docker mode and manual mode caused:
- Port conflicts
- Wrong hostname (`host.docker.internal` vs `localhost`)

### Solution
Separated modes clearly:

**Manual Mode**
- Backend → `localhost:11434`
- Ollama → run manually
- Docker → OFF

**Docker Mode**
- Backend → `host.docker.internal:11434`
- Ollama → inside container

---

## 4. Final Working Setup

### Manual Mode
- Ollama: `ollama serve`
- Backend: `uvicorn main:app --reload`
- Frontend: `npm start`

### Docker Mode
docker compose up --build


Everything works in both modes.

---

# End of Notes
