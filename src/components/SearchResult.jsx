import React, {useCallback, useMemo, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { CatalogItem } from "./CatalogItem";

export const SearchResult = () => {
  const { query } = useParams();
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const page = useRef(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchSearchData = async (query, page) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/search?query=${query}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      return result; // Return the fetched result
    } catch (error) {
      setError(error);
      return []; // Return an empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreSearchData = async () => {
    page.current += 1;

    const newGames = await fetchSearchData(query, page.current);

    if (newGames.length === 0) {
      setHasMore(false);
      return;
    }

    setSearchData((prevGames) => [...prevGames, ...newGames]);
  };

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
    const initialFetch = async () => {
      const initialData = await fetchSearchData(query, page.current);
      setSearchData(initialData);
    };

    initialFetch();
  }, [query]);

  useFixMissingScroll({
    hasMoreItems: hasMore,
    fetchMoreItems: fetchMoreSearchData
  });

  if (loading && searchData.length === 0) {
    return <div className="hero hero-loading">
    <img className="hero-loading-img" src="/loading.svg" alt="Loading" />
  </div>;
  }

  if (error) {
    return <div className="hero">Error: {error.message}</div>;
  }

  return (
    <div className="hero">
      {searchData.length > 0 ? (
        <>
        <p className="search-results-head">Search Results for  {query} :</p>
        <InfiniteScroll
          dataLength={searchData.length}
          next={fetchMoreSearchData}
          hasMore={hasMore}
          loader={
            <div className="hero-loading">
              <img className="hero-loading-img" src="/loading.svg" alt="Loading" />
            </div>
          }
          endMessage={<p className="catalog-end-msg">That's all folks!</p>}
        >
          <div className="catalog-grid">
            {searchData.map((item, key) => (
              <CatalogItem
                key={key}
                gameID={item.game_id}
                ImgURL={item.banner_url}
                name={item.name}
                tags={Array.isArray(item.tags) ? item.tags : []}
                likes={item.like_count}
                dislikes={item.dislike_count}
              />
            ))}
          </div>
        </InfiniteScroll>
        </>
      ) : (
        <p style={{textAlign: 'center'}}>No results found !</p>
      )}
    </div>
  );
};
