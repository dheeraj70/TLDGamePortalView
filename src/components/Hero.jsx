import React,{useState, useEffect} from "react";
import "./Hero.css";
import { Carousel } from "./Carousel/Carousel";
import RightSidePane from "./RightSidePane";
import { Catalog } from "./Catalog";

export const Hero = () => {

/* Logic for group loading fix*/
  const [loadingStates, setLoadingStates] = useState([true, true, true]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Manually check if all elements in loadingStates are false
    let allLoaded = true;
    for (let i = 0; i < loadingStates.length; i++) {
      if (loadingStates[i] === true) {
        allLoaded = false;
        break;
      }
    }
    // Set isLoading based on whether all are loaded
    setIsLoading(!allLoaded);
  }, [loadingStates]);
  const handleLoadingStateChange = (index, isLoading) => {
    setLoadingStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = isLoading;
      return newStates;
    });
  };


  return (
    <div className="hero">
      <div className="hero-hero">
        <Carousel />
        <RightSidePane />
      </div>
      {isLoading && <div className='hero hero-loading'><img className='hero-loading-img' src="/loading.svg" alt="Loading" /></div>}
      
      <Catalog category_hero={false} category_hero_id={1} isIngame={false} heroLoading={isLoading} onLoadingChange={isLoading => handleLoadingStateChange(0, isLoading)}/>
      <Catalog category_hero={false} category_hero_id={2} isIngame={false} heroLoading={isLoading} onLoadingChange={isLoading => handleLoadingStateChange(1, isLoading)}/>
      <Catalog category_hero={false} category_hero_id={3} isIngame={false} heroLoading={isLoading} onLoadingChange={isLoading => handleLoadingStateChange(2, isLoading)}/>
      
    </div>
  );
};
