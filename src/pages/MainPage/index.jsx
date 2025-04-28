import React from "react";
import requests from "../../api/requests";
import TrailerSection from "../../components/TrailerSection";
import ContentRow from "../../components/ContentRow";
import RankingRow from "../../components/RankingRow";

const MainPage = () => {
  return (
    <div className="App">
      <main>
        <TrailerSection />
        <section className="content-section">
          <ContentRow
            title="회원님을 위해 엄선한 오늘의 콘텐츠"
            id="PM"
            fetchUrl={requests.fetchMoviePopular}
          />
          <RankingRow
            title="오늘 대한민국의 TOP 10"
            fetchUrl={requests.fetchMovieTopRated}
          />
          <ContentRow
            title="온 가족을 위한 영화"
            id="DM"
            fetchUrl={requests.fetchDramaMovies}
          />
          <ContentRow
            title="액션 영화"
            id="AM"
            fetchUrl={requests.fetchActionMovies}
          />
        </section>
      </main>
    </div>
  );
};

export default MainPage;
