import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SidePane.css";

export const SidePane = ({ isInGame }) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getCategories().then((dat) => {
      console.log(dat);
      setCategories(dat);
    });
  }, []);

  const getCategories = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
    return res.json();
  };

  return (
    <div
      className="side-pane"
      style={isInGame ? { top: "30px", height: "85%" } : {}}
    >
      <button
        onClick={() => {
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
                navigate(`/categories/${category.CATEGORY_NAME}`,{ state: {categoryID: category.CATEGORY_ID} });
              }}
              key={key}
              className="pane-item"
            >
              <div className="pane-icon">
                <img
                  className="pane-icon-img"
                  src={`/side-panel-icons/${category.SVG}.svg`}
                  alt="Home"
                />
              </div>
              <div className="pane-name">{category.CATEGORY_NAME}</div>
            </button>
          );
        })
      )}

      {/*<div className="pane-item">
          <div className="pane-icon">
            <img
              className="pane-icon-img"
              src="/side-panel-icons/home.svg"
              alt="Home"
            />
          </div>
          <div className="pane-name">Homee</div>
        </div><div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="/side-panel-icons/fire.svg" alt="Action" />

          </div>
          <div className="pane-name">Trending</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="/side-panel-icons/stars.svg" alt="Action" />
          </div>
          <div className="pane-name">New</div>
        </div>
 
        <div className="pane-item">
          <div className="pane-icon">
            <img
              className="pane-icon-img"
              src="/side-panel-icons/sword.svg"
              alt="Action"
            />
          </div>
          <div className="pane-name">Action</div>
        </div>

        <div className="pane-item">
          <div className="pane-icon">
            <img
              className="pane-icon-img"
              src="/side-panel-icons/people.svg"
              alt="Action"
            />
          </div>
          <div className="pane-name">2 Player</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
            <img
              className="pane-icon-img"
              src="/side-panel-icons/compass.svg"
              alt="Action"
            />
          </div>
          <div className="pane-name">Adventure</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="/side-panel-icons/pacman.svg" alt="Action" />
          </div>
          <div className="pane-name">.io</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="/side-panel-icons/joystick.svg" alt="Action" />
          </div>
          <div className="pane-name">Casual</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="/side-panel-icons/multipeople.svg" alt="Action" />
          </div>
          <div className="pane-name">MultiPlayer</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="/side-panel-icons/shoot.svg" alt="Action" />
          </div>
          <div className="pane-name">Shooting</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="/side-panel-icons/sports.svg" alt="Action" />
          </div>
          <div className="pane-name">Sports</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="/side-panel-icons/girl.svg" alt="Action" />
          </div>
          <div className="pane-name">Girls</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="/side-panel-icons/minecraft.svg" alt="Action" />
          </div>
          <div className="pane-name">Vixel</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="/side-panel-icons/cards.svg" alt="Action" />
          </div>
          <div className="pane-name">Card</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
            <i className="fa-solid fa-fire"></i>
          </div>
          <div className="pane-name">Card</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
            <i className="fa-solid fa-fire"></i>
          </div>
          <div className="pane-name">Card</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
            <i className="fa-solid fa-fire"></i>
          </div>
          <div className="pane-name">Card</div>
        </div>*/}
    </div>
  );
};
