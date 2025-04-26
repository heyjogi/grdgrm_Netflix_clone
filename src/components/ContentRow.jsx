import "../styles/ContentRow.css";
import noImage from '../assets/no-image.svg';
import requests from "../api/requests.jsx"

export default function ContentRow({ title }) {
    const movies = Array(40).fill({}); //40개 짜리 빈 영화 데이터
    return (
       <div className = "content-row">
        <div className="content-title">
            <h2>{title}</h2>

            <ul className="content-indicator">
                {movies.slice(0, 10).map((_, i) => (
                    <li key = {i} className = "dot"></li>
                ))}
            </ul>
        </div>

            <div className = "content-slider">
            <button className="slide-btn-left">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" viewBox="0 0 24 24" 
                        fill="none">
                        <path
                            d="M15 6L9 12L15 18" 
                            stroke="currentColor" strokeWidth="3" 
                            strokeLinecap="round" strokeLinejoin="round" 
                        />
                    </svg>
                </button>
                <button className="slide-btn-right">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" viewBox="0 0 24 24" 
                        fill="none">
                        <path
                            d="M9 6L15 12L9 18" 
                            stroke="currentColor" strokeWidth="3" 
                            strokeLinecap="round" strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div className="content-slider-track">
                {movies.map((movie, index) => (
                    <img 
                        key = {index}
                        className = "content-item"
                        src={noImage}
                        // {movie.poster_path 
                        // ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : noImage}
                        alt="임시 포스터"
                    />
                ))}
                </div>
            </div>
        </div>    
    );
}