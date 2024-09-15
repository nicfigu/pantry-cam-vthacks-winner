import React, { useState } from "react";

const RecipeDisplay = ({ response }) => {
  // State to keep track of the recipe whose content is being shown
  const [openRecipe, setOpenRecipe] = useState(null);

  // Function to toggle recipe content
  const handleClick = (index) => {
    if (openRecipe === index) {
      // If the clicked recipe is already open, close it
      setOpenRecipe(null);
    } else {
      // Otherwise, set the clicked recipe as open
      setOpenRecipe(index);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 bg-[#3b3b3b]">
      {response.map((recipe, index) => (
        <div
          key={index}
          className="border p-4 cursor-pointer bg-[#861F41]"
          onClick={() => handleClick(index)}
        >
          <h2 className="font-bold text-lg">{recipe.name}</h2>
          {openRecipe === index && <p className="mt-2">{recipe.content}</p>}
        </div>
      ))}
    </div>
  );
};

export default RecipeDisplay;
