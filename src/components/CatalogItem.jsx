import React from "react";
import { useNavigate} from "react-router-dom";

export const CatalogItem = ({ gameID, ImgURL, name, tags ,likes, dislikes}) => {
  const navigate = useNavigate();
  const rating = (Math.floor((likes) / (likes + dislikes ) * 100)) || 0;
  const backColor = rating <= 30 ? "#943e28" : rating <= 60 ? "#c2c523" : "#008d3b";

  //console.log(backColor);
  return (
    <button title={name} onClick={()=>{navigate(`/game/${gameID}`, { state: {name, tags, likes, dislikes, gameID} })}} className="catalog-item">
      <img
        className="catalog-item-img"
        src={ImgURL}
        alt="Game banner"
      />
      <div className="catalog-item-head">
        <div className="catalog-item-head-left">
          <p className="catalog-item-head-left-head">{name}</p>
          <p className="catalog-tags">
          {tags.slice(0, 2).map((tag, key) => (
      <span key={key} className="catalog-tag">
        {tag}
      </span>
    ))}
    {tags.length > 2 && (
      <span className="catalog-tag-rem">
        +{tags.length - 2} tags
      </span>
    )}
            
          </p>
        </div>
        
      </div>
      <div className="catalog-item-end-div">
      <p className="rating-head">Rating:</p>
      <div className="catalog-item-end">
        <div className="catalog-item-progress" style={{backgroundColor: backColor, width: `${rating}%`}}>
          <p className="progress-rating">{rating}%</p>
        </div>
      </div>
      </div>
    </button>
  );
};
