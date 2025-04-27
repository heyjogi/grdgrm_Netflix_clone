import React, { useState, useEffect } from "react";
import "../styles/Modal.css";
import { IMAGE_BASE_URL } from "../api/config";
import DetailModal from "./DetailModal";
import axios from "../api/axios";

export default function Modal({ movie, position, onMouseEnter, onMouseLeave }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (movie?.id) {
      fetchMovieDetails(movie.id);
    }
  }, [movie]);

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`/movie/${movieId}`);
      setGenres(response.data.genres || []);
    } catch (error) {
      console.error("영화 상세정보 불러오기 실패:", error);
    }
  };

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
  };

  const handleDetailClick = () => {
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    onMouseLeave();
  };

  const handleMouseEnterInternal = () => {
    if (!isDetailOpen) {
      onMouseEnter();
    }
  };

  const handleMouseLeaveInternal = () => {
    if (!isDetailOpen) {
      onMouseLeave();
    }
  };

  return (
    <>
      <div
        className="modal"
        style={{
          top: position.y + 30,
          left: position.x,
          transform: "translate(-50%, 0) scale(1)",
          opacity: isDetailOpen ? 0 : 1,
          pointerEvents: isDetailOpen ? "none" : "auto",
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={handleMouseEnterInternal}
        onMouseLeave={handleMouseLeaveInternal}
      >
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title || movie.name}
        />

        <div className="info">
          <h3 className="modal-title">{movie.title || movie.name}</h3>

          {/* 버튼 그룹 */}
          <div className="modal-buttons">
            <div className="modal-buttons-left">
              <button className="modal-btn modal-circle-btn modal-play-btn">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                </svg>
              </button>

              <button className="modal-btn modal-circle-btn">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <button
                className={`modal-btn modal-circle-btn ${
                  isLiked ? "modal-btn-active" : ""
                }`}
                onClick={handleLikeToggle}
              >
                {isLiked ? (
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M1 21H5V9H1V21ZM23 10C23 8.9 22.1 8 21 8H14.69L15.64 3.43L15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.59C7.22 7.95 7 8.45 7 9V19C7 20.1 7.9 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M21 8H14.69L15.64 3.43L15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.59C7.22 7.95 7 8.45 7 9V19C7 20.1 7.9 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10C23 8.9 22.1 8 21 8ZM21 12L18 19H9V9L13.34 4.66L12.23 10H21V12ZM1 9H5V21H1V9Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="modal-buttons-right">
              <button
                className="modal-btn modal-circle-btn"
                onClick={handleDetailClick}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 장르 */}
          <div className="modal-tags">
            {genres.length > 0 ? (
              genres.map((genre, index) => (
                <span key={genre.id || index}>
                  {genre.name}
                  {index !== genres.length - 1 && " • "}
                </span>
              ))
            ) : (
              <span>장르 없음</span>
            )}
          </div>
        </div>
      </div>

      {/* 디테일 모달 */}
      {isDetailOpen && (
        <div className="detail-modal-fade">
          <DetailModal movieId={movie.id} onClose={handleCloseDetail} />
        </div>
      )}
    </>
  );
}
