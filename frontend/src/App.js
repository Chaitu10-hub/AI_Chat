import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // optional

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: userMessage,
      });

      const reply = res?.data?.reply ?? "Model unavailable";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Model unavailable" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Chat (Local LLM)</h1>

      <div style={styles.chatBox}>
        {messages.length === 0 && (
          <div style={styles.placeholder}>
            Start the conversation by asking a question.
          </div>
        )}

        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              ...(m.role === "user"
                ? styles.userMessage
                : styles.assistantMessage),
            }}
          >
            <strong>{m.role === "user" ? "You: " : "AI: "}</strong>
            {m.text}
          </div>
        ))}

        {loading && (
          <div style={{ ...styles.message, ...styles.assistantMessage }}>
            <strong>AI: </strong>Thinking…
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          style={styles.button}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  chatBox: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    height: "400px",
    overflowY: "auto",
    backgroundColor: "#fafafa",
  },
  placeholder: {
    color: "#888",
    fontStyle: "italic",
  },
  message: {
    marginBottom: "10px",
    padding: "8px 10px",
    borderRadius: "6px",
    lineHeight: 1.4,
    fontSize: "14px",
  },
  userMessage: {
    backgroundColor: "#e3f2fd",
    textAlign: "right",
  },
  assistantMessage: {
    backgroundColor: "#f1f8e9",
    textAlign: "left",
  },
  form: {
    display: "flex",
    marginTop: "12px",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "0 18px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default App;