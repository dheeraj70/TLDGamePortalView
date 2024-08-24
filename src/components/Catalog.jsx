import React, { useEffect, useState, useRef } from 'react';
import { useParams ,useNavigate} from "react-router-dom";
import { CatalogItem } from "./CatalogItem";
import InfiniteScroll from "react-infinite-scroll-component";

export const Catalog = ({ category_hero, name}) => {

  

  const navigate = useNavigate();
  const params = useParams();

  //the following code makes sure that categoryName is available!
  let category = category_hero?params.category:name;



  const [catalog_games, setCatalog_games] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);
 

  const fetchCategoryGames = async (category, page) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/games?category=${category}&page=${page}`);
    const data = await res.json();
    //console.log(data)
    return data;
  }

  useEffect(() => {
    
    fetchCategoryGames(category, page.current).then(games => {
      setCatalog_games(games);
    });
  }, [category,category_hero, name]);

  const fetchMoreData = () => {
    
    page.current += 1;

    fetchCategoryGames(category, page.current).then(newGames => {
      if (newGames.length === 0) {
        setHasMore(false); 
        return;
      }

      setCatalog_games(prevGames => [...prevGames, ...newGames]);
    });
  };

  if (catalog_games.length === 0) return (<div>Loading</div>);

  return (
    <div className={`catalog ${category_hero ? 'hero' : ''}`}>
      <p className="catolog-head">
        {`${category} Games`}
        {(!category_hero &&
          <span>
            <button onClick={()=>{navigate(`/categories/${name}`)}} className="catalog-seeAll">See All {`>`}</button>
          </span>
        )}
      </p>

      {/*Checks if category is true, then renders infinite scroll i.e when clicked through left-side-pane*/
      category_hero?<InfiniteScroll
        dataLength={catalog_games.length} // This is important to keep track of the current length of the array
        next={fetchMoreData} // Function to call when reaching the end
        hasMore={hasMore} // Boolean to know if there's more data to load
        loader={<h4>Loading...</h4>} // Loader for when data is being fetched
        endMessage={<p>Thats all the folks!</p>}
      >
        <div className="catalog-grid">
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
      <div className="catalog-grid">
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