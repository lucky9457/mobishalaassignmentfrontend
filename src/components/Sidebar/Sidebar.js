import React,{useState} from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons'

function Sidebar({clickprevious,handleNewChat,isDarkMode, recentQueries }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const clicktheHistory = (message)=>{
      clickprevious(message)
      console.log('thismsg',message)
  }

  const handleNewChatClick = () => {
    setIsAnimating(true);
    handleNewChat();
    setTimeout(() => setIsAnimating(false), 1000); // Reset animation state after 1 second
  };

  return (
    <div className={`sidebar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1 className='LegAiLOGOName'>LegAi</h1>
      <button className="activate-pro">Legal Ai Assistant</button>
      <hr className='linehor'/>
      
      <div className="pinned-chats">
        <h1>Chats</h1>
        <button onClick={handleNewChatClick} className={`new-chat ${isAnimating ? 'animate' : ''}`}>New Chat
        <FontAwesomeIcon className='pencilIcon' icon={faPencil} />
        </button>
        <h3 className='h3tag'>Pinned chats</h3>
        <p>No pinned chats yet :(</p>
      </div>
      <div className="history">
        <h3 className='h3tag'>History</h3>
          <div className="recent-queries messageuserhistory">
            {recentQueries.length === 0 ? (
              <p>No History available.</p>
            ) : (
              recentQueries.map((message, index) => (
                <div onClick={()=>clicktheHistory(message)} key={index} className="historyItem">
                  {message.text}
                </div>
              ))
            )}
          </div>
      </div>
    </div>
  
  );
}

export default Sidebar;