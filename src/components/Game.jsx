import React, { useEffect, useState } from "react";
import "./Game.css";
import { useParams, useLocation } from "react-router-dom";
import { SidePane } from "./SidePane";
import { Catalog } from "./Catalog";
import { Wrapper } from "./Wrapper";

export const Game = () => {
  const location = useLocation();
  let { name, likes, dislikes, like_count, dislike_count } = location.state || {};
  const { gameID } = useParams();
  const [gameDesc, setGameDesc] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [categoryIDs, setCategoryIDs] = useState([]);

  const getGameDesc = async (gameID) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/gameDesc/${gameID}`);
      const gameDesc = await res.json();
      setGameDesc(gameDesc);
    } catch (err) {
      console.log(err);
    }
  };

  const likeGame = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/likeGame/${gameID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(res.ok){
        setGameDesc(prevDesc => ({
          ...prevDesc,
          like_count: (prevDesc.like_count || 0) + 1
        }));
          alert('Liked');
      }else{
       console.log('failed to update like!')
      }

    } catch (err) {
      console.error(err);
    }
  };

  const dislikeGame = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/dislikeGame/${gameID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(res.ok){
        setGameDesc(prevDesc => ({
          ...prevDesc,
          dislike_count: (prevDesc.dislike_count || 0) + 1
        }));
        alert('Disliked');
      }else{
       console.log('failed to update dislike!')
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getCatID = async (cat_name) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/categoryid?category_name=${cat_name}`);
    const data = await res.json();
    //console.log(data);
    return data[0].category_id; // Assuming the response structure
  };

  const getAllGameData = async (gameID) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/games/${gameID}`);
      const gameDesc = await res.json();
      setGameDesc(gameDesc);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (fullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [fullScreen]);

  useEffect(() => {
    if (location.state) {
      getGameDesc(gameID);
    } else {
      getAllGameData(gameID);
    }
    window.scrollTo(0, 0);
  }, [gameID, location.state]);

  useEffect(() => {
    //console.log('out');
    if(gameDesc){
    if (gameDesc.tags) {
      //console.log('in')
      const fetchCategoryIDs = async () => {
        const ids = [];
        for (let tag of gameDesc.tags) {
          const id = await getCatID(tag);
          ids.push(id);
        }
        setCategoryIDs(ids);
      };
      fetchCategoryIDs();
    }}
  }, [gameDesc]);

  if (!location.state && gameDesc) {
    ({ name, likes, dislikes, like_count, dislike_count } = gameDesc);
  }

  if (gameDesc === null) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <SidePane isInGame={true} />

      <div className="game-right-pane">
        <p className="game-right-head">Content</p>
        <div className="game-right-pane-items"></div>
      </div>

      <div className="hero game-hero">
        <div className="game-container">
          <div className="game">
            <Wrapper gameID={gameID} fullScreen={fullScreen} setFullScreen={setFullScreen} />
          </div>
          <div className="game-fullscreen-controls">
            <button onClick={() => setFullScreen(!fullScreen)} className="fullscreen-btn">
              Full Screen <i className="fa-solid fa-expand"></i>
            </button>
          </div>
        </div>

        <div className="game-desc">
          <h1 className="game-desc-head">
            {name}
            <p className="catalog-game-tags">
              {gameDesc.tags != null &&
                gameDesc.tags.map((tag, key) => (
                  <span key={key} className="catalog-game-tag">
                    {tag}
                  </span>
                ))}
            </p>
          </h1>
          <div className="game-desc-btns">
            <button onClick={likeGame} className="game-desc-btn">
              {" "}
              {likes || like_count || "0"} <i className="fa-solid fa-thumbs-up"></i>
            </button>
            <button onClick={dislikeGame} className="game-desc-btn">
              {" "}
              {dislikes || dislike_count || "0"} <i className="fa-solid fa-thumbs-down"></i>
            </button>
            <button className="game-desc-btn">
              {" "}
              Report <i className="fa-solid fa-flag"></i>
            </button>

            <div className="game-desc-nobtn">
              {" "}
              Rating {(Math.floor((likes || like_count) / ((likes || like_count) + (dislikes || dislike_count)) * 100)) || "0"}%{" "}
              <i className="fa-solid fa-heart"></i>
            </div>
          </div>
          <hr />
          <p>{gameDesc.description}</p>
        </div>

        <div className="game-desc game-more">
          {gameDesc.tags != null &&
            categoryIDs.map((categoryID, key) => (
              <Catalog key={key} category_hero={false} category_hero_id={categoryID} />
            ))}
        </div>
      </div>
    </>
  );
};
