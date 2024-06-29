// src/Chatbot.js
import "./Chatbot.css"
import React, { useState } from 'react';
import axios from 'axios';
const cors = require('cors');


const Chatbot = ({isDarkMode}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    setInput(''); 

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: input }],
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      

      const botMessage = { sender: 'bot', text: response.data.choices[0].message.content };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error fetching the chatbot response:', error);
    }
  };


  return (
    <div className={`chat-area ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="chatbox" >
        <h3>Chats</h3>
        {messages.map((msg, index) => {
            if(msg.sender==='user'){
                 return (
                    <div  key={index} className="chatContsender" style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }} >
                        <span className={`${isDarkMode ? 'senderDark' : 'senderlight'} ${msg.sender==='user'?"senderClass":"botclass"}`} >{msg.text}</span>
                    </div>
                )
            }
            else{
                return (
                    <div key={index} className="chatCont" style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }} >
                        <p className={`${isDarkMode ? 'senderDark' : 'senderlight'} ${msg.sender==='user'?"senderClass":"botclass"}`} >{msg.text}</p>
                    </div>
                )
            }
           

            
       })}
      </div>
      <div className="inputandSendbtnContainer">
            <input
            className='inputmsg'
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
            />
        <button onClick={sendMessage} >Send</button>
      </div>
      
    </div>
  );
};

export default Chatbot;
