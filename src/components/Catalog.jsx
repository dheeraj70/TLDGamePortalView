import React, { useEffect, useState } from 'react';
import { useParams, useLocation} from "react-router-dom";
import { CatalogItem } from "./CatalogItem";


export const Catalog = ({category, name, games}) => {

  //if category === true:
  const {categoryname} = useParams();
  const location = useLocation();
  const { categoryID } = location.state || {categoryID : 1};

    const fetchCategoryGames = async(categoryID)=>{
      const res = await fetch(`${process.env.REACT_APP_API_URL}/category/games?categoryID=${categoryID}&page=1`);
      const games = await res.json();
      return games;
    }
//end of category code

    const [catalog_games,setCatalog_games] = useState(null);
    
    useEffect(()=>{
        //fetchGameArray(games).then(dat => setCatalog_games(dat));
        fetchCategoryGames(categoryID).then(dat => setCatalog_games(dat))
    },[categoryID])


    if(catalog_games === null) return(<div>Loading</div>)

  return (
    <div className={`catalog ${category?'hero':''}`}>
        <p className="catolog-head">
          {category?categoryname+' Games':name}
          {(!category &&<span>
            <button className="catalog-seeAll">See All {`>`}</button>
          </span>)}
          
        </p>
        <div className="catalog-grid">

          
          {catalog_games.map((item, key)=>(<CatalogItem key ={key} gameID={item.game_id} ImgURL={item.banner_url} name={item.name} tags={item.tags} iconURL={"icon1.jpeg"} likes={item.like_count} dislikes={item.dislike_count}/>))}

          
        </div>
      </div>
  )
}


/*  const fetchGameArray = async(games)=>{
        try{
        const queryString = `games=${encodeURIComponent(games.join(','))}`;
        const res = await fetch(`${process.env.REACT_APP_API_URL}/gamesarray?${queryString}`);
        const gameDat = await res.json();
        return(gameDat.games);}
        catch(err){
            console.log(err);
        }
    }*/