import React, { useEffect, useState } from "react";
import "./Game.css";
import { useParams, Link, useLocation } from "react-router-dom";
import { SidePane } from "./SidePane";

export const Game = () => {
  const location = useLocation();
  const { name, tags, likes, dislikes } = location.state || {};
  const {gameID} = useParams();
  const [gameDescURL, setGameDescURL] = useState(null);
  //console.log(gameID);

  const getGameDescURL = async (gameID)=>{
    try{
    const res = await fetch(`${process.env.REACT_APP_API_URL}/gameDescURL/${gameID}`);
    const gameDescURL = await res.json();
    console.log(gameDescURL);
    setGameDescURL(gameDescURL);
  }catch(err){
    console.log(err);
  }
  }
  useEffect(()=>{
    getGameDescURL(gameID);
  },[]);
  if(gameDescURL === null){ return <h1>Loading</h1>}
  return (
    
    <>
    <SidePane isInGame = {true}/>
      
      <div className="game-right-pane">
        <p className="game-right-head">Content</p>
        <div className="game-right-pane-items"></div>
      </div>
      <div className="hero game-hero">
      
        <div className="game-container">
          <div className="game">
            {/* Added img temporaryly, iframe to be put in its place */}
            
            <iframe style={{ height: "100%", width: "100%" ,borderTopLeftRadius: '20px',borderTopRightRadius: '20px'}} src={gameDescURL.iframe_url} frameBorder="0"></iframe>
          </div>
          <div className="game-fullscreen-controls">
          <button className="fullscreen-btn">Full Screen</button>
        </div>
        </div>
        
        <div className="game-desc">
          <h1 className="game-desc-head">{name}</h1>
          <div className="game-desc-btns">
            <button className="game-desc-btn">
              {" "}
              {likes} <i className="fa-solid fa-thumbs-up"></i>
            </button>
            <button className="game-desc-btn">
              {" "}
              {dislikes} <i className="fa-solid fa-thumbs-down"></i>
            </button>
            <button className="game-desc-btn">
              {" "}
              Report <i className="fa-solid fa-flag"></i>
            </button>

            <div className="game-desc-nobtn">
              {" "}
              Rating {Math.floor(likes/(likes + dislikes)*100)}% <i className="fa-solid fa-heart"></i>
            </div>
          </div>
          <hr />
          <p>
            {gameDescURL.description}
          </p>
        </div>
        <div className="game-desc game-more">
          
        </div>
      </div>
    </>
  );
};
