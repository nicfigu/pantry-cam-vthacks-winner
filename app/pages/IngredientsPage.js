"use client";
import React, { useState, useEffect } from "react";

function IngredientsPage() {
  const [hasItems, setHasItems] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  var spices = [];
  var diet = [];
  var preferences = [];
  useEffect(() => {
    // Load ingredients from localStorage when the component mounts
    const loadIngredients = () => {
      const storedIngredients =
        JSON.parse(localStorage.getItem("ings_string")) || [];
      spices = JSON.parse(localStorage.getItem("spices_string")) || [];
      diet = JSON.parse(localStorage.getItem("diets_string")) || [];
      preferences = JSON.parse(localStorage.getItem("health_string")) || [];
      setIngredients(storedIngredients);
      console.log(storedIngredients);
      setHasItems(storedIngredients.length > 0);
    };

    loadIngredients();

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const loadIngredients = () => {
    const storedIngredients =
      JSON.parse(localStorage.getItem("ings_string")) || [];
    setIngredients(storedIngredients);
    setHasItems(storedIngredients.length > 0);
  };

  const handleStorageChange = (e) => {
    if (e.key === "ings_string") {
      const newIngredients =
        JSON.parse(localStorage.getItem("ings_string")) || [];
      console.log("new: ", newIngredients);
      setIngredients(newIngredients);
      setHasItems(newIngredients.length > 0);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#3b3b3b]">
      <div className="flex-grow mt-16">
        <iframe
          src="/ing_page/ingpage.html"
          className="w-full h-full border-none"
          title="Ingredients Page"
        />
        <div className="text-white text-center text-2xl absolute bottom-[35%] left-4 right-4">
          Snap a photo of your options! Let{" "}
          <span className="font-bold bg-gradient-to-r from-[#a52852] to-[#E5751F] inline-block text-transparent bg-clip-text">
            machine learning
          </span>{" "}
          do the rest.
        </div>
      </div>
    </div>
  );
}

export default IngredientsPage;
