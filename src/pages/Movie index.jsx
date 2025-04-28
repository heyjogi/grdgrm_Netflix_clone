import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MoviesPage.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContentRow from '../../components/ContentRow';

const MoviesPage = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // 예시: 영화 목록 불러오기 (TMDB API 또는 자체 API)
        const res = await axios.get('/api/movies');
        setMovieList(res.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-page">
      <Header />
      <div className="movies-container">
        <h1 className="page-title">영화</h1>
        <div className="movies-grid">
          {movieList.map((movie) => (
            <ContentRow key={movie.id} content={movie} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MoviesPage;
