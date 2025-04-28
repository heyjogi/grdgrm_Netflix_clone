import React from "react";
import requests from "../../api/requests";
import TrailerSection from "../../components/TrailerSection";
import ContentRow from "../../components/ContentRow";
import RankingRow from "../../components/RankingRow";

const SeriesPage = () => {
  return (
    <div className="App">
      <main>
        <TrailerSection />
        <section className="content-section">
          <ContentRow
            title="회원님을 위해 엄선한 오늘의 콘텐츠"
            fetchUrl={requests.fetchSeriesPopular}
          />
          <RankingRow
            title="오늘 대한민국의 TOP 10"
            fetchUrl={requests.fetchSeriesTopRated}
          />
          <ContentRow
            title="몰아보기 추천 드라마"
            fetchUrl={requests.fetchDramaSeries}
          />
          <ContentRow
            title="애니 시리즈"
            fetchUrl={requests.fetchAnimeSeries}
          />
        </section>
      </main>
    </div>
  );
};

export default SeriesPage;
