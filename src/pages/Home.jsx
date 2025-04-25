import React from "react";
import Header from "../components/Header.jsx";
import TrailerSection from "../components/TrailerSection.jsx";
import ContentSection from "../components/ContentSection.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <div>
      <main>
        <TrailerSection />

        <ContentSection />
      </main>
    </div>
  );
}
