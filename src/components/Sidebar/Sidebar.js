import React from 'react';
import './Sidebar.css';

function Sidebar({ isDarkMode }) {
  return (
    <div className={`sidebar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
     
      <button className="activate-pro">Activate PRO</button>
      <hr className='linehor'/>
      
      <div className="pinned-chats">
        <h1>Chats</h1>
        <button className="new-chat">New Chat</button>
        <h3>Pinned chats</h3>
        <p>No pinned chats yet :(</p>
      </div>
      <div className="history">
        <h3>History</h3>
            <p>No history yet</p>
      </div>
    </div>
  
  );
}

export default Sidebar;