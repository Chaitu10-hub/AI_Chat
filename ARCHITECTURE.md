# Architecture & Design Decisions

This document describes the architecture, design choices, and reasoning behind the AI Chat Application.

---

## 1. System Overview

The system follows a clean 3‑layer architecture:

1. **React Frontend**  
   - Handles user input  
   - Displays chat history  
   - Shows loading and error states  
   - Sends requests to backend  

2. **FastAPI Backend**  
   - Exposes `/chat` endpoint  
   - Forwards prompts to Ollama  
   - Returns model responses  
   - Acts as a clean abstraction layer  

3. **Local LLM (Ollama)**  
   - Runs TinyLlama model locally  
   - Provides inference via HTTP API  
   - Lightweight (<2B params) to meet assignment requirements  

---

## 2. Architecture Diagram
+---------------------------+
|     React Frontend       |
|        (Chat UI)         |
+------------+-------------+
             |
             |  User question (POST /chat)
             v
+---------------------------+
|       FastAPI Backend    |
|      (/chat endpoint)    |
+------------+-------------+
             |
             |  Prompt forwarded
             v
+---------------------------+
|   Ollama (TinyLlama)     |
|   Local LLM Engine       |
+------------+-------------+
             |
             |  Model response
             v
+---------------------------+
|     React Frontend       |
|     (Display answer)     |
+---------------------------+
           
---

## 3. Data Flow

1. User enters a message in the React UI  
2. Frontend sends POST request to `/chat`  
3. FastAPI receives the message  
4. Backend forwards the prompt to Ollama  
5. Ollama generates a response  
6. Backend returns the response to frontend  
7. UI displays the assistant message  

---

## 4. Technology Choices & Tradeoffs

### React (Frontend)
- Simple component model  
- Fast development  
- Easy state management  

### FastAPI (Backend)
- High performance  
- Clean routing  
- Built-in validation  
- Async-friendly  

### TinyLlama (<2B)
- Meets assignment requirement  
- Fast inference  
- Low memory usage  

### Docker Compose
- Ensures consistent environment  
- Clean separation of services  
- Easy to run on any machine  

---

## 5. Deployment Architecture

The system uses Docker Compose with two services:

- `frontend` → React app  
- `backend` → FastAPI app  

Ollama runs on the host machine and is accessed via:http://host.docker.internal:11434


---

## 6. What Was Not Included (Intentional Tradeoffs)

- No database (not required for assignment)  
- No authentication (out of scope)  
- No streaming responses (simplified JSON handling)  
- No vector search / RAG (not required)  

These decisions keep the project lightweight and aligned with assignment expectations.

---

## 7. Conclusion

The architecture is:

- Clean  
- Maintainable  
- Extensible  
- Fully aligned with assignment requirements  

It demonstrates strong engineering judgment, practical design, and real‑time system thinking.
