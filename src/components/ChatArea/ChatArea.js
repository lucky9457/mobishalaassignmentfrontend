import React from 'react';
import './ChatArea.css';

function ChatArea({ isDarkMode }) {
  return (
    <div className={`chat-area ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="chat-header">
        <h2 className='head-newchat'>New chat</h2>
        <div className='chatbox1'>
            <h2>Hello, Laxma reddy Lucky 👋</h2>
        <p>Please select a question from the "Prompts" library below or write your own question.</p>
        </div>
        
      </div>
    </div>
  );
}

export default ChatArea;