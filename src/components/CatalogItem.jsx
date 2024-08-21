import React from "react";
import { Link } from "react-router-dom";

export const CatalogItem = ({ gameID, ImgURL, name, tags, iconURL ,likes, dislikes}) => {
  return (
    <div className="catalog-item">
      <img
        className="catalog-item-img"
        src={ImgURL}
        alt="Game banner"
      />
      <div className="catalog-item-head">
        <div className="catalog-item-head-left">
          <p className="catalog-item-head-left-head">{name}</p>
          <p className="catalog-tags">
            {(tags!=null)&&(tags.map((tag, key) => (
              <span key={key} className="catalog-tag">
                {tag}
              </span>
            )))}
          </p>
        </div>
        <div className="catalog-item-head-right">
          <img
            className="catalog-icon"
            src={`/icons/${iconURL}`}
            alt="Game Icon"
          />
        </div>
      </div>
      <div className="catalog-item-end">
        <div className="catalog-item-rating">
          <div className="rating-left">
            <div className="rating-icon">
              <img
                style={{ height: "75%", width: "75%" }}
                src="/rating.svg"
                alt="Rating icon"
              />
            </div>
          </div>
          <div className="rating-right">
            <div className="rating-head">Rating</div>
            <div className="rating-value">{Math.floor(likes/(likes+dislikes)*100)} %</div>
          </div>
        </div>
        <Link className="catalog-item-play-link" to={`/game/${gameID}`} state={{name, tags, likes, dislikes, gameID }}>
          <button className="catalog-item-play">Play Now</button>
        </Link>
      </div>
    </div>
  );
};
