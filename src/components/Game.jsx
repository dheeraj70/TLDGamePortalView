import React, { useEffect, useState } from "react";
import "./Game.css";
import { useParams } from "react-router-dom";
import { SidePane } from "./SidePane";
import { Catalog } from "./Catalog";
import { Wrapper } from "./Wrapper";

export const Game = () => {
  
  
  const { gameID } = useParams();
  const [gameDesc, setGameDesc] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [categoryIDs, setCategoryIDs] = useState([]);
  const [moreCat, setMoreCat]= useState(false);
  

  const getGameDesc = async (gameID) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/gameDesc/${gameID}`
      );
      const gameDesc = await res.json();
      setGameDesc(gameDesc);
    } catch (err) {
      console.log(err);
    }
  };

  const likeGame = async (event) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/likeGame/${gameID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        //console.log("liked!");
        event.target.classList.add('bounce');
        setGameDesc((prevDesc) => ({
          ...prevDesc,
          like_count: (prevDesc.like_count || 0) + 1,
        }));
        setTimeout(() => {
          event.target.classList.remove('bounce');
        }, 500);
        //alert("Liked");
      } else {
        console.log("failed to update like!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const dislikeGame = async (event) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/dislikeGame/${gameID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        //console.log("disliked!");
        event.target.classList.add('bounce');
        setGameDesc((prevDesc) => ({
          ...prevDesc,
          dislike_count: (prevDesc.dislike_count || 0) + 1,
        }));
        setTimeout(() => {
          event.target.classList.remove('bounce');
        }, 500);
        //alert("Disliked");
      } else {
        console.log("failed to update dislike!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getCatID = async (cat_name) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/categoryid?category_name=${cat_name}`
    );
    const data = await res.json();
    return data[0].category_id;
  };

  const getAllGameData = async (gameID) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/games/${gameID}`
      );
      const gameDesc = await res.json();
      setGameDesc(gameDesc);
    } catch (err) {
      console.log(err);
    }
  };
  /*
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
*/
  useEffect(() => {
    
    getAllGameData(gameID);
    
    window.scrollTo(0, 0);
  }, [gameID]);

  useEffect(() => {
    if (gameDesc && gameDesc.tags) {
      const fetchCategoryIDs = async () => {
        const ids = [];
        for (let tag of gameDesc.tags) {
          const id = await getCatID(tag);
          ids.push(id);
        }
        setCategoryIDs(ids);
      };
      fetchCategoryIDs();
    }
  }, [gameDesc]);

  const toggleFullScreen = () => {
    const gameElement = document.querySelector(".game");
    if (!document.fullscreenElement) {
      if (gameElement.requestFullscreen) {
        gameElement.requestFullscreen();
      } else if (gameElement.mozRequestFullScreen) {
        // For Firefox
        gameElement.mozRequestFullScreen();
      } else if (gameElement.webkitRequestFullscreen) {
        // For Chrome, Safari and Opera
        gameElement.webkitRequestFullscreen();
      } else if (gameElement.msRequestFullscreen) {
        // For IE/Edge
        gameElement.msRequestFullscreen();
      }
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setFullScreen(false);
    }
  };

  

  if (gameDesc === null) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      {/*<SidePane isInGame={true} />*/}

      <div className="game-right-pane">
        <p className="game-right-head">Content</p>
        <div className="game-right-pane-items"></div>
      </div>

      <div className="hero game-hero">
        <div className="game-container">
          <div className="game">
            <Wrapper
              gameID={gameID}
              fullScreen={fullScreen}
              setFullScreen={setFullScreen}
            />
          </div>
          <div className="game-fullscreen-controls">
            <button onClick={toggleFullScreen} className="fullscreen-btn">
              Full Screen <i className="fa-solid fa-expand"></i>
            </button>
          </div>
        </div>

        <div className="game-desc">
          <h1 className="game-desc-head">
            {gameDesc.name}
            <p className="catalog-game-tags">
              {gameDesc.tags != null &&
                gameDesc.tags.slice(0, 3).map((tag, key) => (
                  <span key={key} className="catalog-game-tag">
                    {tag}
                  </span>
                ))}
              {(!moreCat && gameDesc.tags.length > 3) && (
                <span onClick={()=>{setMoreCat(true)}} className="catalog-tag-rem">+{gameDesc.tags.length - 3} tags</span>
              )}
              {
                moreCat && gameDesc.tags.slice(3).map((tag, key) => (
                  <span key={key} className="catalog-game-tag">
                    {tag}
                  </span>
                ))
              }
            </p>
          </h1>
          <div className="game-desc-btns">
            <button onClick={likeGame} className="game-desc-btn">
              {gameDesc.like_count || "0"}{" "}
              <i className="fa-solid fa-thumbs-up"></i>
            </button>
            <button onClick={dislikeGame} className="game-desc-btn">
              {gameDesc.dislike_count || "0"}{" "}
              <i className="fa-solid fa-thumbs-down"></i>
            </button>
            <button className="game-desc-btn">
              Report <i className="fa-solid fa-flag"></i>
            </button>

            <div className="game-desc-nobtn">
              Rating{" "}
              {Math.floor(
                ((gameDesc.like_count) /
                  ((gameDesc.like_count) + (gameDesc.dislike_count))) *
                  100
              ) || "0"}
              % <i className="fa-solid fa-heart"></i>
            </div>
          </div>
          <hr />
          <p>{gameDesc.description}</p>
        </div>

        <div className="game-desc game-more">
          {gameDesc.tags != null &&
            categoryIDs.map((categoryID, key) => (
              <Catalog
                key={key}
                category_hero={false}
                category_hero_id={categoryID}
                isIngame={true}
              />
            ))}
        </div>
      </div>
    </>
  );
};
