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
          <button className="mute_btn" onClick={toggleMute}>
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                role="img"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                data-icon="VolumeOffStandard"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                role="img"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                data-icon="VolumeHighStandard"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M24 12C24 8.28693 22.525 4.72597 19.8995 2.10046L18.4853 3.51468C20.7357 5.76511 22 8.81736 22 12C22 15.1826 20.7357 18.2348 18.4853 20.4852L19.8995 21.8995C22.525 19.2739 24 15.713 24 12ZM11 3.99995C11 3.59549 10.7564 3.23085 10.3827 3.07607C10.009 2.92129 9.57889 3.00685 9.29289 3.29285L4.58579 7.99995H1C0.447715 7.99995 0 8.44767 0 8.99995V15C0 15.5522 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0786 10.3827 20.9238C10.7564 20.7691 11 20.4044 11 20V3.99995ZM5.70711 9.70706L9 6.41417V17.5857L5.70711 14.2928L5.41421 14H5H2V9.99995H5H5.41421L5.70711 9.70706ZM16.0001 12C16.0001 10.4087 15.368 8.88254 14.2428 7.75732L12.8285 9.17154C13.5787 9.92168 14.0001 10.9391 14.0001 12C14.0001 13.0608 13.5787 14.0782 12.8285 14.8284L14.2428 16.2426C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92889C18.9462 6.80426 19.9998 9.3478 19.9998 12C19.9998 14.6521 18.9462 17.1957 17.0709 19.071L15.6567 17.6568C17.157 16.1565 17.9998 14.1217 17.9998 12C17.9998 9.87823 17.157 7.8434 15.6567 6.34311L17.0709 4.92889Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
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
            {movie.genres?.length > 0 ? (
              movie.genres.map((genre, index) => (
                <span key={genre.id}>
                  {genre.name}
                  {index !== movie.genres.length - 1 && " • "}
                </span>
              ))
            ) : (
              <span>장르 없음</span>
            )}
          </div>
        </div>

        <button className="detail-modal-close" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
}
