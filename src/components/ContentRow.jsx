import "../styles/ContentRow.css";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { IMAGE_BASE_URL } from "../api/config";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ContentRow({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelection] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  };

  return (
    <div className="content-row">
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
              1378: {
                slidesPerView: 5,
                slidesPerGroup: 5,
              },
              998: {
                slidesPerView: 5,
                slidesPerGroup: 5,
              },
              625: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
              0: {
                slidesPerView: 3,
                slidesPerGroup: 3,
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
                <div className="row-item">
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
        </section>
      </div>
    </div>
  );
}
