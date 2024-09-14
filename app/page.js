"use client";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SpicesPage from "./pages/SpicesPage";
import IngredientsPage from "./pages/IngredientsPage";

function Home() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<SpicesPage />} />
            <Route path="/ingredients" element={<IngredientsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default Home;
