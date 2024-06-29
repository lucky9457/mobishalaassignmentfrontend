import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faSun, faMoon,faMagnifyingGlass, faUser,faCloud, faHome, faComment, faAddressBook, faCog } from '@fortawesome/free-solid-svg-icons';
import './SideNavigationBar.css';

function SideNavigationBar({ toggleTheme, isDarkMode }) {
  return (
    <div className={`side-navigation-bar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='logoCont'>
        <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1719643019/chintu/Untitled_logo_1_free-file_1_w6whlo.jpg" className='logoimage'/>
      </div>
      <ul>
      
        <Link className='linkele' to="/">
        {" "}
        <li> <FontAwesomeIcon icon={faComment} /> </li>
         {" "}
        </Link>
        
        
       
        <Link className='linkele' to="/search">
       <li> <FontAwesomeIcon icon={faMagnifyingGlass} /></li>
        </Link>

        <Link className='linkele' to="/cloud">
        <li>  <FontAwesomeIcon icon={faCloud} />   </li>
        </Link>

            <Link className='linkele' to="/profiles">
            <li><FontAwesomeIcon icon={faUser} /></li>
            </Link>
            
            

        
      </ul>
      <ul>
        <li onClick={toggleTheme} className="theme-toggle">
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </li>
      </ul>
      
    </div>
  );
}

export default SideNavigationBar;