import React, { useEffect, useState } from "react";
import "./Carousel.css";
export const Carousel = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const leftCaroBtn = () => {
    setImgIndex((imgIndex) => {
      return imgIndex === images.length - 1 ? 0 : imgIndex + 1;
    });
  };
  const rightCaroBtn = () => {
    setImgIndex((imgIndex) => {
      return imgIndex === 0 ? images.length - 1 : imgIndex - 1;
    });
  };
  const images = [
    "/pic1.jpg",
    "/pic2.jpg",
    "/pic3.jpg",
    "/pic4.jpg",
    "/pic5.jpg",
  ];

  useEffect(()=>{
    const AutoPlay = setInterval(() => {
      leftCaroBtn();
    }, 2000);

    
    return () => clearInterval(AutoPlay);
  },[leftCaroBtn]);
  return (
    <section className="carousel">
      <div
        className="carousel-container"
        style={{ translate: `-${imgIndex * 100}%` }}
      >
        {images.map((img, key) => (
          <img
            alt="Carousel images"
            key={key}
            className="carousel-img"
            src={`./carousel-img/${img}`}
          ></img>
        ))}
      </div>
      <button
        type="button"
        aria-label="Left Image"
        onClick={leftCaroBtn}
        className="carousel-left-btn"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button
        type="button"
        aria-label="Right Image"
        onClick={rightCaroBtn}
        className="carousel-right-btn"
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      <div className="carousel-dots">
        {images.map((img, index) => {
          return (
            <div key={index} onClick={()=>{setImgIndex(index)}} style={{ display: "inline-block", cursor: "pointer" }}>
              {index === imgIndex ? (
                <i className="fa-solid fa-circle-dot"></i>
              ) : (
                <i className="fa-solid fa-circle"></i>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
