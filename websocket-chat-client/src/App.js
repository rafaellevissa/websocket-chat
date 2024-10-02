import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState(''); 
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:8000'); 

    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect(); 
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '') {
      socketRef.current.emit('message', input); 
      setInput('');
    }
  };

  return (
    <div className="App">
      <h1>WebSocket Chat</h1>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            {message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua mensagem..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default App;
