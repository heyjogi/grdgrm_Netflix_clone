import "../styles/ContentRow.css";
import noImage from '../assets/no-image.svg';

export default function ContentRow({ title, contents }) {
    return (
       <div className = "content-row">
        <div className="content-title">
            <h2>{title}</h2>

            <ul className="content-indicator">
                {contents.slice(0, 10).map((_, i) => (
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
                    {contents.map((item, index) => (
                        <div key = {index} className = {`content-item content-item-${index+1}`}>
                            <img src={item.thumbnail || noImage} alt = {item.name || "기본 포스터"} />
                        </div>
                    ))}
                </div>
            </div>
        </div>    
    );
}