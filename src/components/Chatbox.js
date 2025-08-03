// components/Chatbox.js
import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm Jinfeng He, and I'm excited to chat with you! 👋 I can tell you about my experience, projects, skills, education, background, and more. What would you like to know about me?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (useAI) {
        // Use the new secure server-side API
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: inputValue }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Fallback mode with simple keyword matching
        const fallbackResponse = generateFallbackResponse(inputValue);
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: fallbackResponse,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I encountered an error while processing your question. Please try again or switch to fallback mode.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple fallback response generator
  const generateFallbackResponse = (query) => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('experience') || queryLower.includes('work') || queryLower.includes('job')) {
      return "I have diverse experience including:\n• Montaura.tech: I'm the Founder & Full-Stack Developer (Jul 2025 - Present) - I built a basketball app serving 10,000+ users\n• Vosyn.AI: I'm currently a Backend/ML Engineer Intern (Jun 2025 - Present) - working on video processing pipeline with GCP\n• Alibaba Group: I was a Software Engineer Intern (Dec 2023 - Feb 2024) - built a flash sale system with 40% performance improvement\n• USoustenir: I co-founded and was Lead Developer (Apr 2023 - Dec 2023) - sustainable fashion platform";
    }
    
    if (queryLower.includes('project') || queryLower.includes('built') || queryLower.includes('developed')) {
      return "My key projects include:\n• REBL: Enhanced Chemical-Disease Relation Extraction - my advanced biomedical NLP research with 10.33% F1 improvement\n• Multi-Modal Clinical RAG System - healthcare decision support using LLaMA2 and ClinicalBERT\n• Warehouse Management System - my high-performance C++ system with gRPC and Kubernetes\n• Webtama - real-time gaming backend I built in Go with WebSocket and concurrency";
    }
    
    if (queryLower.includes('skill') || queryLower.includes('technology') || queryLower.includes('tech')) {
      return "My technical expertise includes:\n• Programming: Python, Java, C++14, Go, JavaScript, TypeScript, Dart\n• AI/ML: PyTorch, BioBERT, Longformer, LLaMA2, Hugging Face, Vertex AI\n• Frontend: React, Flutter, Redux, TypeScript\n• Backend: Spring Boot, Node.js, FastAPI, Gin, gRPC\n• Cloud: AWS, GCP, Alibaba Cloud, Docker, Kubernetes\n• Databases: PostgreSQL, MongoDB, Redis, PostGIS";
    }
    
    if (queryLower.includes('education') || queryLower.includes('university') || queryLower.includes('cornell')) {
      return "I'm currently pursuing my Master of Engineering at Cornell University in Ithaca, USA. I specialize in systems engineering and have demonstrated strong academic performance with research contributions in biomedical AI and distributed systems.";
    }
    
    if (queryLower.includes('contact') || queryLower.includes('email') || queryLower.includes('phone')) {
      return "You can reach me at jeffreyhe406@gmail.com or call me at (+1) 607-280-7880. I'm also active on LinkedIn at https://www.linkedin.com/in/jinfeng-he-142080302 and GitHub at https://github.com/GGCav. I love connecting with fellow developers and researchers! 😊";
    }
    
    if (queryLower.includes('interest') || queryLower.includes('hobby') || queryLower.includes('personal')) {
      return "My personal interests include basketball (which actually inspired my Montaura.tech startup), working out, watching movies (especially sci-fi and action), playing games, watching anime, traveling, and playing Jubensha (Chinese mystery role-playing games).";
    }
    
    return "That's a great question! I haven't written down my thoughts on that specific topic yet, but I'm glad you asked. I can tell you about my work experience, research projects, technical skills, education, personal background, interests, or contact information. What would you like to know? 😊";
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <div className="chatbox-title">
          <FaRobot className="chatbox-icon" />
          <span>AI Assistant</span>
        </div>
        <button 
          className="ai-toggle-btn"
          onClick={() => setUseAI(!useAI)}
          title={useAI ? "Switch to Fallback Mode" : "Switch to AI Mode"}
        >
          {useAI ? <FaToggleOn /> : <FaToggleOff />}
          <span>{useAI ? "AI ON" : "AI OFF"}</span>
        </button>
      </div>

      <div className="chatbox-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-avatar">
              {message.type === 'ai' ? <FaRobot /> : <FaUser />}
            </div>
            <div className="message-content">
              <div className="message-text">{message.content}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message ai">
            <div className="message-avatar">
              <FaRobot />
            </div>
            <div className="message-content">
              <div className="message-text">
                <span className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chatbox-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={useAI ? "Chat with Jinfeng..." : "Ask me anything (fallback mode)..."}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputValue.trim()}>
          <FaPaperPlane />
        </button>
      </form>

      <div className="chatbox-info">
        {useAI ? (
          <p>💡 AI Mode: Powered by advanced semantic search and Google Gemini</p>
        ) : (
          <p>💡 Fallback Mode: Simple keyword matching for instant responses</p>
        )}
      </div>
    </div>
  );
};

export default Chatbox; 