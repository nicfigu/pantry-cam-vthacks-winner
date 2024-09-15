import React, { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        {children}
        <button
          className="mt-4 bg-[#861F41] text-white px-4 py-2 rounded hover:bg-[#6e1a36]"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const RecipeDisplay = ({ response }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid grid-rows-3 gap-4 bg-[#3b3b3b] pt-10 min-h-screen">
        {response.map((recipe, index) => (
          <div
            key={index}
            className="border p-4 cursor-pointer bg-[#861F41] text-white rounded-xl"
            onClick={() => handleClick(recipe)}
          >
            <h2 className="font-bold text-lg">{recipe.name}</h2>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-2 text-black max-h-screen overflow-auto">
          {selectedRecipe?.name}
        </h2>
        <p className="whitespace-break-spaces text-black">
          {selectedRecipe?.content}
        </p>
      </Modal>
    </>
  );
};

export default RecipeDisplay;
