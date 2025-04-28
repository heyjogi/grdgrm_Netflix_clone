import React from "react";
import requests from "../../api/requests";
import TrailerSection from "../../components/TrailerSection";
import ContentRow from "../../components/ContentRow";
import RankingRow from "../../components/RankingRow";

const MoviesPage = () => {
  return (
    <div className="App">
      <main>
        <TrailerSection />
        <section className="content-section">
          <ContentRow
            title="꼭 챙겨보세요! 회원님을 위한 콘텐츠"
            fetchUrl={requests.fetchMoviePopular}
          />
          <RankingRow
            title="오늘 대한민국의 TOP 10 영화"
            fetchUrl={requests.fetchMovieTopRated}
          />
          <ContentRow
            title="범죄 & 스릴러 영화"
            fetchUrl={requests.fetchCrimeMovies}
          />
          <ContentRow
            title="헤드라인 뒤에 가려진 이야기들"
            fetchUrl={requests.fetchDocumentaryMovies}
          />
        </section>
      </main>
    </div>
  );
};

export default MoviesPage;
