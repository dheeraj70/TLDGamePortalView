import React, { useEffect } from 'react'
import { useParams, useLocation} from "react-router-dom";
import { Catalog } from './Catalog';

export const IdealHero = () => {

    const {categoryname} = useParams();
    const location = useLocation();
    const { categoryID } = location.state || {};

    const getCategoryGames = async(categoryID)=>{
      const res = await fetch(`${process.env.REACT_APP_API_URL}/category/games?categoryID=${categoryID}`);
      const games = await res.text();
      console.log(games);
    }

    useEffect(()=>{
      getCategoryGames(categoryID);
    },[categoryID])

  return (
    <div className='hero'>
    
    <Catalog name = {categoryname} games = {'[1,2,3,4]'}/>

    </div>
  )
}
