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

          
          {images.map((item, key)=>(<CatalogItem key ={key} ImgURL={item} name={"Amazing Spider Man"} tags={["Action","Shooter"]} iconURL={"icon1.jpeg"}/>))}

          
        </div>
      </div>*/}
      <Catalog category={false} name={'Popular Games'} games={'[1,2,3,4]'} category_hero_id={1}/>
      
    </div>
  );
};
