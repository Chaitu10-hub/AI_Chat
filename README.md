# AI Chat Application (React + FastAPI + Ollama)

This project is a lightweight AI-powered chat application demonstrating frontend architecture, backend API design, and local LLM integration using Ollama. 

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
- Docker  
- Docker Compose  

---

##  Setup Instructions

### 1. Install Ollama
Download from: https://ollama.com

### 2. Pull the required model
ollama pull tinyllama

### 3. Clone the repository
git clone https://github.com/ /AI_Chat

### 4. Start the application
docker compose up --build

### 5. Open the app
http://localhost:3000

---

## Project Structure
AI_Chat/
backend/
frontend/
docker-compose.yml
README.md
ARCHITECTURE.md
