import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import SearchPage from "./pages/SearchPage";
import "./App.css";

export default function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Home />
                            <Footer />
                        </>
                    }
                />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </div>
    );
}
