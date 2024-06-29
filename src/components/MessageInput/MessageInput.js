import React from 'react';
import './MessageInput.css';

function MessageInput({ isDarkMode }) {
  return (
    <div className={`message-input ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
    
      <input type="text" placeholder="Type your message here" />
      <button className='senbtn'>Send</button>
    </div>
   
  );
}

export default MessageInput;