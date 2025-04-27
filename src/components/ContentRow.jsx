import "../styles/ContentRow.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import { IMAGE_BASE_URL } from "../api/config";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal from "./Modal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ContentRow({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  };

  const handleMouseEnter = (e, movie) => {
    clearTimeout(hoverTimeoutRef.current);

    const containerRect = containerRef.current.getBoundingClientRect();
    const cardRect = e.currentTarget.getBoundingClientRect();
    const newPosition = {
      x: cardRect.left + cardRect.width / 2 - containerRect.left,
      y: cardRect.top - containerRect.top - 120,
    };

    setIsHovering(false);
    setHoveredMovie(null);

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredPosition(newPosition);
      setHoveredMovie(movie);
      setIsHovering(true);
    }, 120);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsHovering(false);
  };

  useEffect(() => {
    if (!isHovering) {
      const timeout = setTimeout(() => {
        setHoveredMovie(null);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isHovering]);
  return (
    <div className="content-row" ref={containerRef}>
      <div className="content-title">
        <section className="row">
          <h2>{title}</h2>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation={{
              prevEl: ".row-slider-container .slide-btn-left",
              nextEl: ".row-slider-container .slide-btn-right",
            }}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
              1400: {
                slidesPerView: 6,
                slidesPerGroup: 6,
              },
              1100: {
                slidesPerView: 5,
                slidesPerGroup: 5,
              },
              800: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
              500: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              400: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              0: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
            }}
          >
            <div className="row-slider-container">
              <button className="slide-btn-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 6L9 12L15 18"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="slide-btn-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div
                  className="row-item"
                  onMouseEnter={(e) => handleMouseEnter(e, movie)}
                  onMouseLeave={handleMouseLeave}
                >
                  {" "}
                  <img
                    className={`row__poster ${
                      isLargeRow && "row__posterLarge"
                    }`}
                    src={`${IMAGE_BASE_URL}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    loading="lazy"
                    alt={movie.title || movie.name || "영화 포스터"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {hoveredMovie && (
            <Modal
              movie={hoveredMovie}
              position={hoveredPosition}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            />
          )}
        </section>
      </div>
    </div>
  );
}
