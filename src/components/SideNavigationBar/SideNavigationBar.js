import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faUsers, faRightFromBracket, faHeadset, faMoon, faMagnifyingGlass, faUser, faCloud, faComment } from '@fortawesome/free-solid-svg-icons';
import './SideNavigationBar.css';
import { IoLogOut } from 'react-icons/io5';
import { googleLogout } from '@react-oauth/google';



import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function SideNavigationBar({ toggleTheme, isDarkMode }) {
  const location = useLocation();
  const darkmodeclass = isDarkMode ? "whiteimage" : "";

  const navigate = useNavigate();

  const onLogOut = () => {
    googleLogout();
    Cookies.remove('token');

    // Redirect to the login page or home page
    navigate('/');
  }

  return (
    <div className={`side-navigation-bar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div>
        {isDarkMode ? (
          <div className='logoCont'>
            <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1719660210/chintu/Legai_1_c1olwj.png" className={`logoimage ${isDarkMode}`} />
          </div>
        ) : (
          <div className='logoCont'>
            <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1719658345/chintu/Legai_yug6fi.png" className={`logoimage ${isDarkMode}`} />
          </div>
        )}

        <ul className='tabiconsContainer'>
          <Link className='linkele' to="/">
            <li className={`litag ${location.pathname === "/" ? 'active' : ''}`}>
              {/*<FontAwesomeIcon icon={faHeadset} />*/}
              <img src='https://res.cloudinary.com/dcwxu3d5g/image/upload/v1721306399/Task%20internship/bot_icon_tfcqux.png' alt="roboAiNav" className='roboaiiconNav' />
            </li>
          </Link>

          <Link className='linkele' to="/chat">
            <li className={`litag ${location.pathname === '/chat' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faComment} />
            </li>
          </Link>

          <Link className='linkele' to="/dataset">
            <li className={`litag ${location.pathname === '/dataset' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faCloud} />
            </li>
          </Link>

          <Link className='linkele' to="/clientDataset">
            <li className={`litag ${location.pathname === '/clientDataset' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faUsers} />
            </li>
          </Link>



          <Link className='linkele' to="/search">
            <li className={`litag ${location.pathname === '/search' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </li>
          </Link>

          <Link className='linkele' to="/profiles">
            <li className={`litag ${location.pathname === '/profiles' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faUser} />
            </li>
          </Link>
        </ul>
      </div>

      <ul className='tabiconsContainer'>
        <li onClick={onLogOut} className="litag theme-toggle">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </li>
        <li onClick={toggleTheme} className="theme-togglemain litag theme-toggle">
          <FontAwesomeIcon className='iconToggle' icon={isDarkMode ? faSun : faMoon} />
        </li>
      </ul>
    </div>
  );
}

export default SideNavigationBar;
