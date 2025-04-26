import "../styles/RankingRow.css";
import noImage from '../assets/no-image.svg';
import requests from "../api/requests.jsx"

export default function RankingRow({ contents }) {
    const movies = Array(10).fill({}); //10개 짜리 빈 영화 데이터
    return (
       <div className="ranking-row">
        <div className="ranking-title">
            <h2>top10</h2>

            <ul className="ranking-indicator">
                {movies.slice(0, 2).map((_, i) => (
                    <li key={i} className="dot"></li>
                ))}
            </ul>
        </div>

            <div className="ranking-slider">
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

                <div className="ranking-slider-track">
                    {movies.map((movie, index) => (
                        <div key={index} className="ranking-poster">
                            <svg id={`rank-${index + 1}`} 
                                width="100%" height="100%"
                                viewBox={contents[index]?.viewBox}
                                className={`ranking-icon svg-icon-rank-${index + 1}`}>

                                <path stroke="#595959" strokeWidth="4" d={contents[index]?.path}></path>
                            </svg>
                            <img 
                                key = {index}
                                className = "ranking-item"
                                src={noImage}
                                // {movie.poster_path 
                                // ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : noImage}
                                alt="임시 포스터"
                            />
                        </div>
                    ))}
                    {/* {contents.map((item, index) => (
                        <div key={index} className={`ranking-item ranking-item-${index + 1}`}>
                            <svg id={`rank-${index + 1}`} 
                                width="100%" height="100%"
                                viewBox={item.viewBox}
                                className={`ranking-icon svg-icon-rank-${index + 1}`}>

                                <path stroke="#595959" strokeWidth="4" d={item.path}></path>
                            </svg>
                            <img
                                src={item.thumbnail || noImage}
                                alt={item.name || "기본 포스터"}
                            />
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );    
}

    