import "../styles/RankingRow.css";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IMAGE_BASE_URL } from "../api/config";

export default function RankingRow({ fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log("TMDB 응답:", request);
      setMovies(request.data.results.slice(0, 10));
    }
    fetchData();
  }, []);

  return (
    <div className="ranking-row">
      <h2>Top 10</h2>
      <Swiper slidesPerView={5} spaceBetween={10}>
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div className="ranking-item" style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  fontSize: "5rem",
                  color: "white",
                  zIndex: 1,
                }}
              >
                {index + 1}
              </span>
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
