import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./Chatbot.css"; 
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchChatHistory = async () => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && userSnap.data().chats) {
        setMessages(userSnap.data().chats);
      }
    };

    fetchChatHistory();
  }, [user]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchAIResponse = async (userInput) => {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userInput }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://dharmendra23101.github.io/projects",
            "X-Title": "Chatbot"
          }
          
        }
      );

      return response.data.choices[0]?.message?.content || "I'm not sure how to respond.";
    } catch (error) {
      console.error("Error fetching AI response:", error.response?.data || error.message);
      return "I'm currently unavailable.";
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    setLoading(true);

    const newMessage = { text: input, sender: "User", timestamp: new Date().toISOString() };
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const existingChats = userSnap.exists() ? userSnap.data().chats || [] : [];

    const updatedChats = [...existingChats, newMessage];

    await updateDoc(userRef, { chats: updatedChats });
    setMessages(updatedChats);
    setInput("");

    const aiResponse = await fetchAIResponse(input);
    const botMessage = { text: aiResponse, sender: "Bot", timestamp: new Date().toISOString() };

    const finalChats = [...updatedChats, botMessage];

    await updateDoc(userRef, { chats: finalChats });
    setMessages(finalChats);

    setLoading(false);
  };

  const clearChat = async () => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { chats: [] });

    setMessages([]);
  };

  return (
    <div className="chat-container">
      <h3 className="chat-title">AI Chatbot</h3>
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === "User" ? "user-message" : "bot-message"}`}>
              <span className="message-text">{msg.text}</span>
            </div>
          ))
        ) : (
          <p className="no-messages">No messages yet.</p>
        )}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
          disabled={loading}
        />
        <button onClick={sendMessage} className="send-button" disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
        <button onClick={clearChat} className="clear-button">Clear Chat</button>
      </div>
    </div>
  );
};

export default Chatbot;
