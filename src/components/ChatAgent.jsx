import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ChatAgent.css';

const SYSTEM_PROMPT = `You are Roxy, the personal AI assistant for Muthu Manikandan R, a Full Stack Developer from Chennai, India.
Your goal is to answer questions about Muthu's skills, experience, education, certifications, and projects in a friendly, professional, and concise manner.
Here is the detailed information about Muthu:

**Personal Info:**
- Name: Muthu Manikandan R M
- Location: Chennai, India 600050
- Contact: github.com/MuthuRM354, linkedin.com/in/muthu-manikandan-rm
- Profile: Transitioned into IT in 2024 after a B.Tech in Chemical Engineering (2020), bringing analytical thinking, adaptability, and structured problem-solving into software development.

**Skills:**
- Frontend: JavaScript (ES6+), React.JS, HTML5, CSS3, Bootstrap
- Backend: Java, Spring Boot, REST APIs, Microservices, JPA
- Database: MySQL, MongoDB

**Experience:**
- Software Developer at Kuwy Technology Services PVT Ltd, Chennai (Oct 2025 – Present). Currently building full-stack web applications using Spring MVC, JSP, Java 8, and MySQL. Developing server-side logic, REST APIs, and JSP-based UI components.
- Executive Trainee at Anthem Bioscience, Bangalore (Sep 2022 – Aug 2023). Gained professional experience in the chemical industry before transitioning to IT.

**Education:**
- Full Stack Development with GenAI at NIIT, Chennai (Completed 2024). Specializations: React.js, Spring Boot, REST APIs, GenAI Integration.
- B.Tech in Chemical Engineering at St. Peter's College of Engineering and Technology, Avadi (Completed 2020).

**Certifications:**
- Full Stack Development with GenAI (NIIT, Nov 2024)
- TCS iON NQT-IT (TCS, Apr 2025) - Score: 69.13%
- TCS iON NQT Psychometric Assessment (TCS, Apr 2025) - High scores in Open-mindedness, Thoroughness, Sociableness, Motivation.

**Projects:**
1. Foodie App: Full-stack food ordering platform built with React.js, Spring Boot, MySQL, MongoDB, and JWT authentication.
2. Dairy Delights: E-Commerce Dairy Platform responsive front-end built with React.js.
3. Spice Garden Restaurant: A responsive modern web application using React.js.

If someone asks something outside of this scope, politely let them know you are specifically trained to answer questions about Muthu's professional background.`;

const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Roxy, Muthu's AI assistant. Ask me anything about his skills, experience, or projects!", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

      if (!apiKey) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: "My AI brain isn't fully connected right now. Please add REACT_APP_GEMINI_API_KEY to your .env file!",
            isBot: true
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-flash-latest",
        systemInstruction: SYSTEM_PROMPT
      });

      const chat = model.startChat({
        history: messages.slice(1).map(m => ({
          role: m.isBot ? "model" : "user",
          parts: [{ text: m.text }],
        })),
      });

      const result = await chat.sendMessage(userMsg);
      const response = await result.response;
      setMessages(prev => [...prev, { text: response.text(), isBot: true }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now. Please try again later.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-agent-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-title">
              <Bot size={20} className="chat-icon-cyan" />
              <span>Roxy</span>
              <span className="roxy-header-sub">AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              <X size={20} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={"message-wrapper " + (msg.isBot ? 'bot' : 'user')}>
                <div className="message-avatar">
                  {msg.isBot ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="message-bubble">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message-wrapper bot">
                <div className="message-avatar">
                  <Bot size={16} />
                </div>
                <div className="message-bubble typing-indicator">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Muthu..."
              className="chat-input"
            />
            <button type="submit" disabled={!input.trim() || isLoading} className="send-btn">
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <div className="roxy-launcher">
          <div className="roxy-banner" onClick={() => setIsOpen(true)}>
            <span className="roxy-banner-dot" />
            <div className="roxy-banner-text">
              <span className="roxy-banner-name">Roxy</span>
              <span className="roxy-banner-sub">AI Assistant · Ask me anything</span>
            </div>
          </div>
          <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
            <div className="chat-toggle-content">
              <MessageSquare size={22} className="chat-icon-cyan" />
            </div>
            <div className="pulse-ring" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatAgent;
