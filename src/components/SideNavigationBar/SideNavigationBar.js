import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faSun, faMoon,faMagnifyingGlass, faUser,faCloud, faHome, faComment, faAddressBook, faCog } from '@fortawesome/free-solid-svg-icons';
import './SideNavigationBar.css';

function SideNavigationBar({ toggleTheme, isDarkMode }) {
  const darkmodeclass = isDarkMode?"whiteimage":""
  return (
    <div className={`side-navigation-bar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div>

      
      {isDarkMode?(
        <div className='logoCont'>
          <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1719660210/chintu/Legai_1_c1olwj.png" className={`logoimage ${isDarkMode}`}/>
        </div>
      ):
      (
        <div className='logoCont'>
          <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1719658345/chintu/Legai_yug6fi.png" className={`logoimage ${isDarkMode}`}/>
        </div>
      )
      }
      
      <ul className='tabiconsContainer'>

      <Link className='linkele' to="/">
        <li>  <FontAwesomeIcon icon={faCloud} />   </li>
        </Link>
      
        <Link className='linkele' to="/chat">
        {" "}
        <li> <FontAwesomeIcon icon={faComment} /> </li>
         {" "}
        </Link>
        
        
       
        <Link className='linkele' to="/search">
       <li> <FontAwesomeIcon icon={faMagnifyingGlass} /></li>
        </Link>

        

            <Link className='linkele' to="/profiles">
            <li><FontAwesomeIcon icon={faUser} /></li>
            </Link>
            
            

        
      </ul>
      </div>
      <ul>
        <li onClick={toggleTheme} className="theme-toggle">
          <FontAwesomeIcon className='iconToggle' icon={isDarkMode ? faSun : faMoon} />
        </li>
      </ul>
      
      
    </div>
  );
}

export default SideNavigationBar;