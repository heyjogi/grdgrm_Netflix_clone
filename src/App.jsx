import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import "./App.css";
import ProfileSelect from "./pages/ProfileSelect.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MainPage from "./pages/MainPage/index.jsx";
import SeriesPage from "./pages/SeriesPage/index.jsx";
import MoviesPage from "./pages/MoviePage/index.jsx";

export default function App() {
  const [isProfileSelected, setIsProfileSelected] = useState(() => {
    return localStorage.getItem("profileSelected") === "true";
  });

  const Layout = () => {
    return (
      <div>
        {isProfileSelected && <Header />}

        <Outlet />

        <Footer />
      </div>
    );
  };

  return (
    <div className="App">
      <Routes>
        {isProfileSelected ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/movies" element={<MoviesPage />} />
          </Route>
        ) : (
          <Route
            path="/"
            element={
              <ProfileSelect
                onSelect={() => {
                  localStorage.setItem("profileSelected", "true");
                  setIsProfileSelected(true);
                }}
              />
            }
          />
        )}
      </Routes>
    </div>
  );
}
