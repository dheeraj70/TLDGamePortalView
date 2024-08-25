import React from "react";
import "./Hero.css";
import { Carousel } from "./Carousel/Carousel";
import RightSidePane from "./RightSidePane";
import { Catalog } from "./Catalog";

export const Hero = () => {

  return (
    <div className="hero">
      <div className="hero-hero">
        <Carousel />
        <RightSidePane />
      </div>
      {/*<div className="catalog">
        <p className="catolog-head">
          Popular Games{" "}
          <span>
            <button className="catalog-seeAll">See All {`>`}</button>
          </span>
        </p>
        <div className="catalog-grid">

          
          {images.map((item, key)=>(<CatalogItem key ={key} ImgURL={item} name={"Amazing Spider Man"} tags={["Action","Shooter"]} />))}

          
        </div>
      </div>*/}
      <Catalog category={false} category_hero_id={1}/>
      <Catalog category={false} category_hero_id={2}/>
      <Catalog category={false} category_hero_id={3}/>
      
    </div>
  );
};
