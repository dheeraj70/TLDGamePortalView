import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SidePane.css";
import { AuthContext } from "../context/AuthContext";

export const SidePane = ({
  isInGame,
  menuFull,
  setMenuFull,
  isNotInstalled,
  handleInstallClick,
}) => {
  const navigate = useNavigate();
  const { user, loading, logout } = useContext(AuthContext);
  const [categories, setCategories] = useState(null);
  const sidePanel = useRef(null);

  useEffect(() => {
    getCategories().then((dat) => {
      setCategories(dat);
    });

    const handleClickOutside = (event) => {
      if (
        menuFull &&
        sidePanel.current &&
        !sidePanel.current.contains(event.target)
      ) {
        document.body.style.overflow = "";
        setMenuFull(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuFull, setMenuFull]);

  const getCategories = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
    return res.json();
  };

  return (
    <div
      ref={sidePanel}
      className={`side-pane ${menuFull ? "side-pane-full" : ""}`}
      style={{
        top: isInGame ? "30px" : "",
        height: isInGame ? "calc(100% - 60px)" : "",
      }}
    >
      {menuFull && (
        <button
          onClick={() => {
            document.body.style.overflow = "";
            setMenuFull(false);
          }}
          className="sidePane-close-btn"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      )}

      {menuFull && (
        <div className="side-pane-down">
          {user && (
            <button
              onClick={() => {
                navigate("/profile");
                document.body.style.overflow = "";
                setMenuFull(false);
              }}
              className="side-pane-login side-pane-profile"
            >
              Profile
            </button>
          )}
          {user === null ? (
            <button
              onClick={() => {
                navigate("/auth");
                document.body.style.overflow = "";
                setMenuFull(false);
              }}
              className="side-pane-login"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate("/");
                document.body.style.overflow = "";
                setMenuFull(false);
              }}
              className="side-pane-login"
            >
              Logout
            </button>
          )}

          {isNotInstalled && (
            <button onClick={handleInstallClick} className="side-pane-login">
              Install App
            </button>
          )}
        </div>
      )}
      <button
        onClick={() => {
          if (menuFull) {
            document.body.style.overflow = "";
            setMenuFull(false);
          }
          navigate(`/`);
        }}
        className="pane-item"
      >
        <div className="pane-icon">
          <img
            className="pane-icon-img"
            src="/side-panel-icons/home.svg"
            alt="Home"
          />
        </div>
        <div className="pane-name">Home</div>
      </button>
      {categories === null ? (
        <img
          style={{ height: "10%" }}
          className="hero-loading-img"
          src="/loading.svg"
          alt="Loading"
        />
      ) : (
        categories.map((category, key) => {
          return (
            <button
              onClick={() => {
                if (menuFull) {
                  document.body.style.overflow = "";
                  setMenuFull(false);
                }
                navigate(`/categories/${category.category_id}`);
              }}
              key={key}
              className="pane-item"
            >
              <div className="pane-icon">
                <img
                  className="pane-icon-img"
                  src={`/side-panel-icons/${category.SVG}.svg`}
                  alt={category.CATEGORY_NAME}
                />
              </div>
              <div className="pane-name">{category.CATEGORY_NAME}</div>
            </button>
          );
        })
      )}
    </div>
  );
};
