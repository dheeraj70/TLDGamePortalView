import React from 'react'

export const CatalogItem = ({ImgURL, name, tags, iconURL}) => {
  return (
    <div className="catalog-item">
    <img
      className="catalog-item-img"
      src={`./carousel-img${ImgURL}`}
      alt="Game banner"
    />
    <div className="catalog-item-head">
      <div className="catalog-item-head-left">
        <p className="catalog-item-head-left-head">
          {name}
        </p>
        <p className="catalog-tags">
            {tags.map((tag,key)=>(<span key={key} className="catalog-tag">{tag}</span>))}
          
          
        </p>
      </div>
      <div className="catalog-item-head-right">
        <img className="catalog-icon" src={`./icons/${iconURL}` }alt="Game Icon" />
      </div>
    </div>
    <div className="catalog-item-end">
      <div className="catalog-item-rating">
        <div className="rating-left"><div className="rating-icon">
          <img style={{height: "75%", width: "75%"}} src="./rating.svg" alt="Rating icon" />
          </div></div>
        <div className="rating-right">
        <div className="rating-head">Rating</div>
        <div className="rating-value">98%</div>
        </div>
      </div>
      <div className="catalog-item-play">Play Now</div>
    </div>
  </div>
  )
}
