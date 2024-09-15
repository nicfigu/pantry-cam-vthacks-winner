"use client";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SpicesPage from "./pages/SpicesPage";
import IngredientsPage from "./pages/IngredientsPage";

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full">
      <Header />
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<SpicesPage />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default Home;
