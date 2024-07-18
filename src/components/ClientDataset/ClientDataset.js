import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone,faTrash } from '@fortawesome/free-solid-svg-icons';
import SideNavigationBar from '../SideNavigationBar/SideNavigationBar';
import ClientSidebar from '../ClientSidebar/ClientSidebar';
import './ClientDataset.css';
import { useTheme } from "../ThemeContext";

function ClientDataset() {
    const { isDarkMode, toggleTheme } = useTheme();

   

  return (
    <div className={`storageMainContainer ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <SideNavigationBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <div className="Storage-containerDatset">
            <ClientSidebar  toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
       </div>
       <div class="containerClient">
                    <div class="headerClientset">
                        <div class="profile">
                            <div class="photo">Photo</div>
                            <div class="info">
                                <p>Name</p>
                                <p>Number</p>
                                <p>Email</p>
                            </div>
                        </div>
                        <div class="assistant">
                            <div class="icon"><FontAwesomeIcon icon={faMicrophone} /></div>
                            <p>Client Assistant</p>
                        </div>
                    </div>
                    <ul class="navbar">
                        <li class="nav-item">Cases</li>
                        <li class="nav-item">Documents</li>
                        <li class="nav-item">Assistant</li>
                        <li class="nav-item">Conversation</li>
                        <li class="nav-item">Message</li>
                        <li class="nav-item">Billings</li>
                        <li class="nav-item">Profile</li>
                    </ul>
                    <div class="content">
                        <div class="toolbar">
                            <div class="tool">Model</div>
                            <div class="tool">Transcriber</div>
                            <div class="tool">Voice</div>
                            <div class="tool">Functions</div>
                            <div class="tool">Advanced</div>
                            <div class="tool">Analysis</div>
                        </div>
                        <div class="editor">
                            <div className='publishDeleteContainer'>
                            <button class="publish">Publish</button>
                            <button class="delete"><FontAwesomeIcon className='icondelete' icon={faTrash} /></button>
                            </div>
                            
                            <p>Draft saved 1 minute ago.</p>
                        </div>
                    </div>
                </div>
    </div>
    
  );
}

export default ClientDataset;