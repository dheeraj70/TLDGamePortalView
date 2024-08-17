import React from "react";
import "./Hero.css";
import { Carousel } from "./Carousel/Carousel";
import RightSidePane from "./RightSidePane";
import { CatalogItem } from "./CatalogItem";

export const Hero = () => {
  const images = [
    "/pic1.jpg",
    "/pic2.jpg",
    "/pic3.jpg",
    "/pic4.jpg",
    "/pic5.jpg",
  ];
  return (
    <div className="hero">
      <div className="hero-hero">
        <Carousel />
        <RightSidePane />
      </div>
      <div className="catalog">
        <p className="catolog-head">
          Popular Games{" "}
          <span>
            <button className="catalog-seeAll">See All {`>`}</button>
          </span>
        </p>
        <div className="catalog-grid">
          <div className="catalog-item">
            <img
              className="catalog-item-img"
              src=".\carousel-img\pic1.jpg"
              alt="Game banner"
            />
            <div className="catalog-item-head">
              <div className="catalog-item-head-left">
                <p className="catalog-item-head-left-head">
                  Amazing Spider Man
                </p>
                <p className="catalog-tags">
                  <span className="catalog-tag">Action</span>
                  <span className="catalog-tag">Shooting</span>
                </p>
              </div>
              <div className="catalog-item-head-right">
                <img className="catalog-icon" src="./icons/icon1.jpeg" alt="" />
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
          
          {images.map((item, key)=>(<CatalogItem ImgURL={item} name={"Amazing Spider Man"} tags={["Action","Shooter"]} iconURL={"icon1.jpeg"}/>))}
          {images.map((item, key)=>(<CatalogItem ImgURL={item} name={"Amazing Spider Man"} tags={["Action","Shooter"]} iconURL={"icon1.jpeg"}/>))}

          
        </div>
      </div>
      
    </div>
  );
};
