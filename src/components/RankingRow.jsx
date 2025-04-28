import "../styles/RankingRow.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IMAGE_BASE_URL } from "../api/config";
import Modal from "./Modal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function RankingRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results.slice(0, 10));
    }
    fetchData();
  }, [fetchUrl]);

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
    <div className="ranking-row" ref={containerRef}>
      <div className="ranking-title">
        <section className="row">
          <h2>{title}</h2>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation={{
              prevEl: ".row-slider-container .slide-btn-left",
              nextEl: ".row-slider-container .slide-btn-right",
            }}
            pagination={{ clickable: true }}
            loop={false}
            slidesPerView={6}
            spaceBetween={30}
            slidesPerGroup={1}
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
            {movies.map((movie, index) => (
              <SwiperSlide key={movie.id}>
                <div
                  className="ranking-item"
                  onMouseEnter={(e) => handleMouseEnter(e, movie)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="ranking-number">{index + 1}</div>
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="ranking-poster"
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
