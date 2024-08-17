import React from "react";
import "./SidePane.css";

export const SidePane = () => {
  return (
    <div className="side-pane-container">
      <div className="side-pane">
        <div className="pane-item">
          <div className="pane-icon">
            <img
              className="pane-icon-img"
              src="./side-panel-icons/home.svg"
              alt="Home"
            />
          </div>
          <div className="pane-name">Home</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="./side-panel-icons/fire.svg" alt="Action" />

          </div>
          <div className="pane-name">Trending</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="./side-panel-icons/stars.svg" alt="Action" />
          </div>
          <div className="pane-name">New</div>
        </div>
 
        <div className="pane-item">
          <div className="pane-icon">
            <img
              className="pane-icon-img"
              src="./side-panel-icons/sword.svg"
              alt="Action"
            />
          </div>
          <div className="pane-name">Action</div>
        </div>

        <div className="pane-item">
          <div className="pane-icon">
            <img
              className="pane-icon-img"
              src="./side-panel-icons/people.svg"
              alt="Action"
            />
          </div>
          <div className="pane-name">2 Player</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
            <img
              className="pane-icon-img"
              src="./side-panel-icons/compass.svg"
              alt="Action"
            />
          </div>
          <div className="pane-name">Adventure</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="./side-panel-icons/pacman.svg" alt="Action" />
          </div>
          <div className="pane-name">.io</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="./side-panel-icons/joystick.svg" alt="Action" />
          </div>
          <div className="pane-name">Casual</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="./side-panel-icons/multipeople.svg" alt="Action" />
          </div>
          <div className="pane-name">MultiPlayer</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="./side-panel-icons/shoot.svg" alt="Action" />
          </div>
          <div className="pane-name">Shooting</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="./side-panel-icons/sports.svg" alt="Action" />
          </div>
          <div className="pane-name">Sports</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="./side-panel-icons/girl.svg" alt="Action" />
          </div>
          <div className="pane-name">Girls</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="./side-panel-icons/minecraft.svg" alt="Action" />
          </div>
          <div className="pane-name">Vixel</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
          <img className='pane-icon-img' src="./side-panel-icons/cards.svg" alt="Action" />
          </div>
          <div className="pane-name">Card</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
            <i class="fa-solid fa-fire"></i>
          </div>
          <div className="pane-name">Card</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
            <i class="fa-solid fa-fire"></i>
          </div>
          <div className="pane-name">Card</div>
        </div>
        <div className="pane-item">
          <div className="pane-icon">
            <i class="fa-solid fa-fire"></i>
          </div>
          <div className="pane-name">Card</div>
        </div>
      </div>
    </div>
  );
};
