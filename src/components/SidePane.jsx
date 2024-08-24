import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SidePane.css";

export const SidePane = ({ isInGame, menuFull, setMenuFull }) => {
  const navigate = useNavigate();
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
        height: isInGame ? "85%" : "",
      }}
    >
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
        <div> Loading </div>
      ) : (
        categories.map((category, key) => {
          return (
            <button
              onClick={() => {
                if (menuFull) {
                  document.body.style.overflow = "";
                  setMenuFull(false);
                }
                navigate(`/categories/${category.CATEGORY_NAME}`);
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
