# AI Chat Application (React + FastAPI + Ollama)

A lightweight AI‑powered chat application demonstrating modern frontend architecture, backend API design, and local LLM integration using Ollama.
The project is fully containerized using Docker Desktop, but also supports manual setup for users who prefer running it without Docker.

---

##  Features
- React-based chat interface
- Conversation history
- “Thinking…” loading indicator
- Graceful error handling
- FastAPI backend with clean routing
- Local LLM integration using Ollama
- Uses TinyLlama (<2B parameters)
- Fully Dockerized (frontend + backend)

---

##  Tech Stack

### Frontend
- React  
- Axios  

### Backend
- Python  
- FastAPI  

### AI Model
- TinyLlama (1.1B parameters)  
- Served locally via Ollama  

### Deployment
- Docker  Desktop
- Docker Compose  

---

##  Setup Instructions

### 1. Install Ollama
Download from: https://ollama.com

### 2. Pull the required model
ollama pull tinyllama

### 3. Clone the repository
git clone https://github.com/Chaitu10-hub/AI_Chat

### 4. Start the application
docker compose up --build

### 5. Open the app
http://localhost:3000



---
### Running Manually
# Backend Setup (FastAPI)
Create a virtual environment:
python -m venv venv

Activate it(Windows):
venv\Scripts\activate

Install dependencies:
pip install -r requirements.txt

Start the Backend:
uvicorn main:app --reload --host 0.0.0.0 --port 8000

Backend will run at: http://localhost:8000
# Frontend Setup(React)
Install dependencies
cd frontend
npm install

Start the frontend
npm start
Frontend will run at:http://localhost:3000

# Connecting Frontend & Backend
REACT_APP_API_URL=http://localhost:8000


## Project Structure
AI_Chat/
backend/
frontend/
docker-compose.yml
README.md
ARCHITECTURE.md
