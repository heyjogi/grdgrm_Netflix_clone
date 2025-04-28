import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import "./App.css";
import ProfileSelect from "./pages/ProfileSelect.jsx";
import Header from "./components/Header.jsx";
import TrailerSection from "./components/TrailerSection.jsx";
import RankingRow from "./components/RankingRow.jsx";
import ContentRow from "./components/ContentRow.jsx";
import Footer from "./components/Footer.jsx";
import requests from "./api/requests.jsx";
import SeriesPage from "./pages/SearchPage/SeriesPageindex.jsx";
import MoviesPage from "./pages/SearchPage/Movie index.jsx";

export default function App() {
    const [isProfileSelected, setIsProfileSelected] = useState(() => {
        return localStorage.getItem("profileSelected") === "true";
    });

    return (
        <div className="App">
            {isProfileSelected && <Header />}

            <Routes>
                <Route
                    path="/"
                    element={
                        isProfileSelected ? (
                            <>
                                <main>
                                    <TrailerSection />
                                    <section className="content-section">
                                        <ContentRow
                                            title="회원님을 위해 엄선한 오늘의 콘텐츠"
                                            id="PM"
                                            fetchUrl={
                                                requests.fetchMoviePopular
                                            }
                                        />
                                        <RankingRow
                                            title="오늘 대한민국의 TOP 10"
                                            fetchUrl={
                                                requests.fetchMovieTopRated
                                            }
                                        />
                                        <ContentRow
                                            title="온 가족을 위한 영화"
                                            id="DM"
                                            fetchUrl={requests.fetchDramaMovies}
                                        />
                                        <ContentRow
                                            title="액션 영화"
                                            id="AM"
                                            fetchUrl={
                                                requests.fetchActionMovies
                                            }
                                        />
                                    </section>
                                </main>

                                <Footer />
                            </>
                        ) : (
                            <ProfileSelect
                                onSelect={() => {
                                    localStorage.setItem(
                                        "profileSelected",
                                        "true"
                                    );
                                    setIsProfileSelected(true);
                                }}
                            />
                        )
                    }
                />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/series" element={<SeriesPage />} />
                <Route path="/movies" element={<MoviesPage />} />
            </Routes>
        </div>
    );
}
