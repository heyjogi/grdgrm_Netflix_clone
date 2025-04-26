import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import axious from "../../api/axious";
import "./SearchPage.css";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const observer = useRef();

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const searchTerm = query.get("q");

  const fetchData = async (searchTerm, page) => {
    try {
      let results = [];

      if (searchTerm) {
        const searchRes = await axious.get(
          `/search/multi?include_adult=false&query=${searchTerm}&page=${page}`
        );
        results = searchRes.data.results;

        // 검색 결과가 너무 적으면 인기 콘텐츠 추가
        if (results.length < 10) {
          const extraRes = await axious.get(
            `/discover/movie?sort_by=popularity.desc&page=${page}`
          );
          results = [...results, ...extraRes.data.results];
        }
      } else {
        // 검색어 없을 경우 기본 콘텐츠
        const discoverRes = await axious.get(
          `/discover/movie?sort_by=popularity.desc&page=${page}`
        );
        results = discoverRes.data.results;
      }

      setSearchResults((prev) => [...prev, ...results]);
      setHasMore(results.length > 0);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    setSearchResults([]);
    setPage(1);
    fetchData(searchTerm, 1);
  }, [searchTerm]);

  useEffect(() => {
    if (page === 1) return;
    fetchData(searchTerm, page);
  }, [page]);

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const fetchTrailer = async (id, type) => {
    try {
      const res = await axious.get(`/${type}/${id}/videos`);
      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      return trailer ? trailer.key : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleMouseEnter = async (id, type) => {
    setHoveredMovieId(id);
    const trailerKey = await fetchTrailer(id, type);
    setTrailerUrl(trailerKey);
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null);
    setTrailerUrl(null);
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie, index) => {
          if (movie.backdrop_path && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            const isLast = index === searchResults.length - 1;
            const type = movie.media_type || "movie";

            return (
              <div
                className="movie"
                key={movie.id + "-" + index}
                ref={isLast ? lastElementRef : null}
              >
                <div
                  className="movie__column-poster"
                  onMouseEnter={() => handleMouseEnter(movie.id, type)}
                  onMouseLeave={handleMouseLeave}
                >
                  {hoveredMovieId === movie.id && trailerUrl ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerUrl}`}
                      title="YouTube trailer"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      frameBorder="0"
                    />
                  ) : (
                    <img
                      src={movieImageUrl}
                      alt="movie"
                      className="movie__post"
                    />
                  )}
                </div>
              </div>
            );
          }
          return null;
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자하는 검색어 "{searchTerm}"에 맞는 컨텐츠가 없습니다.</p>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}
