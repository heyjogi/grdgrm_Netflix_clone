import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { IMAGE_BASE_URL } from "../api/config";
import "../styles/DetailModal.css";

export default function DetailModal({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const movieResponse = await axios.get(
          `/movie/${movieId}?language=ko-KR`
        );
        setMovie(movieResponse.data);

        const videoResponse = await axios.get(
          `/movie/${movieId}/videos?language=ko-KR`
        );
        const trailer = videoResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setVideoKey(trailer.key);
        }
      } catch (error) {
        console.error("DetailModal Error:", error);
      }
    }
    fetchData();
  }, [movieId]);

  if (!movie) return null;

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="detail-modal-backdrop" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="detail-modal-media-wrapper">
          {videoKey ? (
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              className="detail-modal-img"
              src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title || movie.name}
            />
          )}

          {/* 재생/추가/좋아요 버튼 */}
          <div className="detail-modal-buttons">
            <button className="play-btn">▶ 재생</button>
            <button className="add-btn">+</button>
            <button
              className={`like-btn ${isLiked ? "liked" : ""}`}
              onClick={handleLikeToggle}
            >
              {isLiked ? (
                <svg width="30" height="30" viewBox="0 0 24 24">
                  <path
                    d="M1 21H5V9H1V21ZM23 10C23 8.9 22.1 8 21 8H14.69L15.64 3.43L15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.59C7.22 7.95 7 8.45 7 9V19C7 20.1 7.9 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg width="30" height="30" viewBox="0 0 24 24">
                  <path
                    d="M21 8H14.69L15.64 3.43L15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.59C7.22 7.95 7 8.45 7 9V19C7 20.1 7.9 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10C23 8.9 22.1 8 21 8ZM21 12L18 19H9V9L13.34 4.66L12.23 10H21V12ZM1 9H5V21H1V9Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* 음소거 버튼 */}
          <button className="mute-btn" onClick={toggleMute}>
            {isMuted ? (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M10 18V30H18L30 42V6L18 18H10Z" fill="white" />
                <line
                  x1="35"
                  y1="17"
                  x2="43"
                  y2="31"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <line
                  x1="43"
                  y1="17"
                  x2="35"
                  y2="31"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M10 18V30H18L30 42V6L18 18H10Z" fill="white" />
                <path
                  d="M34 16C36.5 18.5 36.5 29.5 34 32"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="detail-modal-content">
          <h1 className="detail-modal-title">{movie.title || movie.name}</h1>

          <div className="detail-modal-info">
            <span>{movie.release_date?.split("-")[0]}년</span>
          </div>

          <p className="detail-modal-overview">{movie.overview}</p>

          <div className="detail-modal-tags">
            {movie.genres?.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
        </div>

        <button className="detail-modal-close" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
}
