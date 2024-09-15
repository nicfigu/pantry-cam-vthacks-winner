import React, { useState, useEffect } from "react";

function IngredientsList() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    // Load ingredients from local storage when the component mounts
    const storedIngredients =
      JSON.parse(localStorage.getItem("ings_string")) || [];
    setIngredients(storedIngredients);
  }, [localStorage.getItem("ings_string")]);

  return (
    <div className="ingredients-list">
      <h1>Ingredients List</h1>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientsList;
