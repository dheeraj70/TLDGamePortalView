import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useParams ,useNavigate} from "react-router-dom";
import { CatalogItem } from "./CatalogItem";
import InfiniteScroll from "react-infinite-scroll-component";

export const Catalog = ({ category_hero, category_hero_id, isIngame, onLoadingChange, heroLoading}) => {

  

  const navigate = useNavigate();
  const params = useParams();

  //the following code makes sure that category is available!
  let category = category_hero?params.category_id:category_hero_id;



  const [catalog_games, setCatalog_games] = useState([]);
  const [catName, setCatName] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const[isLoading, setIsLoading] = useState(true);
  const page = useRef(1);
 

  const fetchCategoryGames = async (category, page) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/games?category_id=${category}&page=${page}`);
    const data = await res.json();
    //console.log(data)
    return data;
  }

  const getCategoryName = async (category, page) =>{
    const res = await fetch(`${process.env.REACT_APP_API_URL}/categoryname?category_id=${category}`);
    const data = await res.json();
    //console.log(data)
    return data;
  }

  function useFixMissingScroll({ hasMoreItems, fetchMoreItems }) {
    const mainElement = useMemo(() => document.querySelector('.catalog'), [])
  
    const fetchCb = useCallback(() => {
      fetchMoreItems()
    }, [fetchMoreItems])
  
    useEffect(() => {
      const hasScroll = mainElement ? mainElement.scrollHeight > mainElement.clientHeight : false
      if (!hasScroll && hasMoreItems) {
        setTimeout(() => {
          fetchCb()
        }, 100)
      }
    }, [hasMoreItems, fetchCb, mainElement])
  }

  useEffect(() => {
    
    setIsLoading(true);
    page.current=1;
    Promise.all([fetchCategoryGames(category, page.current), getCategoryName(category)])
      .then(([games, categoryName]) => {
        if (games.length === 0) {
          navigate('/404'); 
          return;
        }
        setCatalog_games(games);
        setCatName(categoryName[0].CATEGORY_NAME);
      })
      .finally(() => {
        setIsLoading(false); 
        if(!category_hero){
          onLoadingChange(false);
        }
        
      });
  }, [category]);

  const fetchMoreData = () => {
    
    page.current += 1;

    fetchCategoryGames(category, page.current).then(newGames => {
      if (newGames.length === 0) {
        setHasMore(false); 
        return;
      }

      setCatalog_games(prevGames => [...prevGames, ...newGames]);
      setIsLoading(false);
    });
  };

  useFixMissingScroll({
    hasMoreItems: hasMore,
    fetchMoreItems: fetchMoreData
  });
  
  
  if (isLoading){
    if(category_hero){
      return (<div className='hero hero-loading'><img className='hero-loading-img' src="/loading.svg" alt="Loading" /></div>);
    }else if(heroLoading){
      return null;
    }
  }

  return (
    
    <div className={`catalog ${category_hero ? 'hero' : ''}`}>
      <p className="catolog-head">
        {`${catName} Games`}
        {(!category_hero &&
          <span>
            <button title='See more' onClick={()=>{navigate(`/categories/${category}`)}} className="catalog-seeAll">See All {`>`}</button>
          </span>
        )}
      </p>

      {/*Checks if category is true, then renders infinite scroll i.e when clicked through left-side-pane*/
      category_hero?
      <InfiniteScroll
        dataLength={catalog_games.length} // This is important to keep track of the current length of the array
        next={fetchMoreData} // Function to call when reaching the end
        hasMore={hasMore} // Boolean to know if there's more data to load
        loader={<div className='hero-loading'><img className='hero-loading-img' src="/loading.svg" alt="Loading" /></div>} // Loader for when data is being fetched
        endMessage={<p className='catalog-end-msg'>That's all folks!</p>}
      >
        <div className={isIngame?'catalog-grid-ingame':'catalog-grid'}>
          {catalog_games.map((item, key) => (
            <CatalogItem
              key={key}
              gameID={item.game_id}
              ImgURL={item.banner_url}
              name={item.name}
              tags={item.tags.constructor === Array?item.tags:[]}
              likes={item.like_count}
              dislikes={item.dislike_count}
            />
          ))}
        </div>
      </InfiniteScroll>:
      <div className={isIngame?'catalog-grid-ingame':'catalog-grid'}>
      {catalog_games.map((item, key) => (
        <CatalogItem
          key={key}
          gameID={item.game_id}
          ImgURL={item.banner_url}
          name={item.name}
          tags={item.tags.constructor === Array?item.tags:[]}
          likes={item.like_count}
          dislikes={item.dislike_count}
        />
      ))}
    </div>

      }
      
    </div>
  );
};


/*  const fetchGameArray = async(games)=>{
        try{
        const queryString = games=${encodeURIComponent(games.join(','))};
        const res = await fetch(${process.env.REACT_APP_API_URL}/gamesarray?${queryString});
        const gameDat = await res.json();
        return(gameDat.games);}
        catch(err){
            console.log(err);
        }
    }*/