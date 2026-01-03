import React, { useState, useRef, useEffect } from 'react';

const AIChatbox = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: 'Hello! I am your AI assistant. How can I help you manage your inventory today?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = {
            id: messages.length + 1,
            sender: 'user',
            text: inputValue
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue('');

        // Simulate AI response
        setTimeout(() => {
            const aiMsg = {
                id: messages.length + 2,
                sender: 'ai',
                text: 'I am a simulated AI response. I can help you find products, check stock, or analyze webhook data.'
            };
            setMessages((prev) => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <div className="chatbox-container">
            <div className="chatbox-header">
                <h2>AI Assistant</h2>
                <span className="status-indicator online">Online</span>
            </div>

            <div className="messages-list">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                        <div className={`message-bubble ${msg.sender}`}>
                            {msg.text}
                        </div>
                        <span className="message-time">Just now</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-area">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="chat-input"
                />
                <button type="submit" className="btn-primary send-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default AIChatbox;
