import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CameraMLComponent from "./CameraMLComponent";

function IngredientsPage() {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedIngredients = JSON.parse(
      localStorage.getItem("ings_string") || "[]"
    );
    setIngredients(savedIngredients);
  }, []);

  const handleAddIngredient = () => {
    if (inputValue.trim() !== "") {
      const newIngredients = inputValue
        .split(",")
        .map((i) => i.trim().toUpperCase());
      setIngredients((prev) => [...new Set([...prev, ...newIngredients])]);
      setInputValue("");
      updateLocalStorage([...ingredients, ...newIngredients]);
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    const updatedIngredients = ingredients.filter((i) => i !== ingredient);
    setIngredients(updatedIngredients);
    updateLocalStorage(updatedIngredients);
  };

  const handleDetectedIngredients = (detectedIngredients) => {
    const newIngredients = [
      ...new Set([...ingredients, ...detectedIngredients]),
    ];
    setIngredients(newIngredients);
    updateLocalStorage(newIngredients);
  };

  const updateLocalStorage = (ingredientList) => {
    localStorage.setItem("ings_string", JSON.stringify(ingredientList));
  };

  const handleContinue = () => {
    navigate("/recipes");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add Ingredients</h1>

      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter ingredients (comma-separated)"
        />
        <button
          onClick={handleAddIngredient}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>

      <CameraMLComponent onDetection={handleDetectedIngredients} />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Current Ingredients</h2>
        {ingredients.map((ingredient) => (
          <div
            key={ingredient}
            className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded"
          >
            <span>{ingredient}</span>
            <button
              onClick={() => handleRemoveIngredient(ingredient)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleContinue}
        className="mt-8 px-6 py-3 bg-green-500 text-white rounded text-lg font-semibold"
      >
        Continue to Recipes
      </button>
    </div>
  );
}

export default IngredientsPage;
