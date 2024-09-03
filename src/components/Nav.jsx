import React, {useState, useContext} from "react";
import { useNavigate} from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

import "./Nav.css";

export const Nav = ({menuFull, setMenuFull, isNotInstalled, handleInstallClick}) => {

  const navigate = useNavigate();
  const { user ,logout, timedalert} = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState('');
  //const [MobileSearch, setMobileSearch] = useState(false);

  const burgerPressed = () => {
    document.body.style.overflow = "hidden";

    setMenuFull(true);
  }

  return (
    <div className='nav-bar-container'>
    <nav className="nav-bar">
      <div className="nav-left">
        <img onClick={()=>{navigate('/')}} className="nav-logo" src="/logo.png" alt="TLD games" />
      </div>
      <div className="nav-middle">
      <form onSubmit={()=>{navigate(`/search/${searchQuery}`)}} className="nav-search-form">
          <input
            className="nav-search"
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="nav-search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="nav-right">
        {/*<button onClick={()=>{setMobileSearch(true)}} className="nav-notification mobSearchBtn">
          {" "}
          <i className="fa-solid fa-magnifying-glass "></i>
        </button>*/}
        {user && <button onClick={()=>{navigate('/profile')}} className="nav-notification nav-profile-btn">
          <i className="fa-solid fa-user"></i>
        </button>}
        <button onClick={()=>{navigate('/notifications')}} className="nav-notification">
          <i className="fa-solid fa-bell"></i>
        </button>
        {isNotInstalled && <button onClick={handleInstallClick} className="nav-install"> Install App </button>}
        {user===null?<button onClick={()=>{navigate('/auth')}} className="nav-login"> Login </button>:<button onClick={()=>{logout();navigate("/");timedalert('Logged Out !', 'yellow')}} className="nav-login"> Logout </button>}
        
        <button
        className="nav-burger"
        onClick={burgerPressed}
      >
        <div className="burgerb"></div>
        <div className="burgerb"></div>
        <div className="burgerb"></div>
      </button>
      </div>
    </nav>
    <div className="nav-mob-search">
    <form onSubmit={()=>{navigate(`/search/${searchQuery}`)}} className="nav-search-form">
          <input
            className="nav-search"
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="nav-search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </div>
  );
};
