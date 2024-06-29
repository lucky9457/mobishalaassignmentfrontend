import React from 'react';
import './StorageMainContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function StorageMainContent({ isDarkMode }) {
  return (
    <div className={`storage-main-content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        
      <div className="header">
        <div>
            <h3 className='storagenamehead'>Storage</h3>
            <button className='storagebtn'>Upload</button>
        </div>
        <div className='getmorestoragebtnContainer'>
            <button className="get-more-storage">Get more storage</button>
            
            <div className="usage-info">
                <div class="slidecontainer">
                    <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
                </div>

                <p>0 of 50K Symbols used </p>
            </div>
        </div>
        
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Date</th>
              <th>
                <div className='searchCon'>
                    <FontAwesomeIcon className='searchicon' icon={faMagnifyingGlass} />
                    <input className='searchEle' type="search"/>
                </div>
                
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className="empty-message">You don't have any files yet :(</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StorageMainContent;