import "../styles/RankingRow.css";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IMAGE_BASE_URL } from "../api/config";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function RankingRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results.slice(0, 10));
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="ranking-row">
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
            slidesPerView="auto"
            spaceBetween={30}
            slidesPerGroup={1}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
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
                <div className="ranking-item">
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
        </section>
      </div>
    </div>
  );
}
