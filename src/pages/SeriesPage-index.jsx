import React, { useEffect, useState } from "react";
import axios from "axios";
// import './SeriesPage.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContentRow from "../components/ContentRow";

const SeriesPage = () => {
  const [seriesList, setSeriesList] = useState([]);
  const API_KEY = "77d2f75e486855cc6b9b70bc06dcaa0d"; // 여기에 발급받은 API 키를 넣으세요
  const BASE_URL = "https://api.themoviedb.org/3";
  const POPULAR_SERIES_URL = `<span class="math-inline">\{BASE\_URL\}/tv/popular?api\_key\=</span>{API_KEY}&language=ko-KR`; // 한국어 설정

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await axios.get(POPULAR_SERIES_URL);
        setSeriesList(res.data.results);
        console.log(res.data.results); // 데이터 확인
      } catch (error) {
        console.error("TMDB API 에러:", error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div className="series-page">
      <Header />
      <div className="series-container">
        <h1 className="page-title">인기 시리즈</h1>
        <div className="series-grid">
          {seriesList.map((series) => (
            <ContentRow key={series.id} content={series} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SeriesPage;
