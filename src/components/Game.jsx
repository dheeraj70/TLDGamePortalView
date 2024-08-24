import React, { useEffect, useState } from "react";
import "./Game.css";
import { useParams,  useLocation } from "react-router-dom";
import { SidePane } from "./SidePane";
import { Catalog } from "./Catalog";
import { Wrapper } from "./Wrapper";

export const Game = () => {
  const location = useLocation();
  let { name, tags, likes, dislikes, like_count, dislike_count} = location.state || {};
  const {gameID} = useParams();
  const [gameDesc, setGameDesc] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  //console.log(gameID);

  const getGameDesc = async (gameID)=>{
    try{
    const res = await fetch(`${process.env.REACT_APP_API_URL}/gameDesc/${gameID}`);
    const gameDesc = await res.json();
    //console.log(gameDesc);
    setGameDesc(gameDesc);
  }catch(err){
    console.log(err);
  }
  }

  const getAllGameData = async (gameID)=>{
    try{
    const res = await fetch(`${process.env.REACT_APP_API_URL}/games/${gameID}`);
    const gameDesc = await res.json();
    //console.log(gameDesc);
    setGameDesc(gameDesc);
  }catch(err){
    console.log(err);
  }
  }
  useEffect(() => {
    if (fullScreen) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling
      document.body.style.overflow = '';
    }
    
    // Cleanup to reset scrolling when component is unmounted
    return () => {
      document.body.style.overflow = '';
    };
  }, [fullScreen]);
  useEffect(()=>{
    if(location.state){
      getGameDesc(gameID);
    }else{
      getAllGameData(gameID);
    }
    window.scrollTo(0, 0);
    
  },[gameID,location.state]);

  if (!location.state && gameDesc) {
    ({ name, tags, likes, dislikes, like_count, dislike_count} = gameDesc);
  }

  if(gameDesc === null){ return <h1>Loading</h1>}
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
            
            <Wrapper gameID={gameID} fullScreen={fullScreen} setFullScreen={setFullScreen}/>
          </div>
          <div className="game-fullscreen-controls">
          <button onClick={()=>{ setFullScreen(!fullScreen)}} className="fullscreen-btn">Full Screen <i className="fa-solid fa-expand"></i></button>
        </div>
        </div>
        
        <div className="game-desc">
          <h1 className="game-desc-head">{name}<p className="catalog-game-tags">
            {(tags!=null)&&(tags.map((tag, key) => (
              <span key={key} className="catalog-game-tag">
                {tag}
              </span>
            )))}
          </p></h1>
          <div className="game-desc-btns">
            <button className="game-desc-btn">
              {" "}
              {likes || like_count || '0'} <i className="fa-solid fa-thumbs-up"></i>
            </button>
            <button className="game-desc-btn">
              {" "}
              {dislikes || dislike_count|| '0'} <i className="fa-solid fa-thumbs-down"></i>
            </button>
            <button className="game-desc-btn">
              {" "}
              Report <i className="fa-solid fa-flag"></i>
            </button>

            <div className="game-desc-nobtn">
              {" "}
              Rating {(Math.floor((likes || like_count)/((likes || like_count) + (dislikes || dislike_count))*100))||'0'}% <i className="fa-solid fa-heart"></i>
            </div>
          </div>
          <hr />
          <p>
            {gameDesc.description}
          </p>
        </div>
        <div className="game-desc game-more">
        {(tags!=null)&&(tags.map((tag, key) => (
              <Catalog key={key} category={false} name={tag} />
            )))}
        </div>
      </div>
    </>
  );
};
