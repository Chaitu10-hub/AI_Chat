from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            # if you are using docker desktop, you might need to change the URL to "http://host.docker.internal:11434/api/generate"
            json={
                "model": "TinyLlama",
                "prompt": req.message,
                "stream": False   # <-- THIS FIXES YOUR ERROR
            },
            timeout=180
        )


        data = response.json()
        reply = data.get("response", "No response from model")

        return {"reply": reply}

    except Exception as e:
        return {"reply": f"Backend error: {str(e)}"}