import React,{useRef} from "react";
import "./Nav.css";

export const Nav = ({menuFull, setMenuFull}) => {



  const burgerPressed = () => {
    document.body.style.overflow = "hidden";

    setMenuFull(true);
  }

  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <img className="nav-logo" src="/logo.png" alt="TLD games" />
      </div>
      <div className="nav-middle">
        <input
          className="nav-search"
          type="text"
          name="search"
          id="search"
          placeholder="Search"
        />
        <i className="fa-solid fa-magnifying-glass nav-search-icon"></i>
      </div>
      <div className="nav-right">
        <button className="nav-notification mobSearchBtn">
          {" "}
          <i className="fa-solid fa-magnifying-glass "></i>
        </button>
        <button className="nav-notification">
          <i className="fa-solid fa-user-group"></i>
        </button>
        <button className="nav-notification">
          <i className="fa-solid fa-bell"></i>
        </button>
        <button className="nav-login"> Login </button>
        
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
  );
};
