import React, { useEffect, useState } from "react";

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
  const [selectedName, setSelectedName] = useState(null);
  const handleClick = (recipe, name) => {
    setSelectedRecipe(recipe);
    setSelectedName(name);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid grid-rows-3 gap-4 bg-[#434343] pt-10 min-h-screen">
        {response.recipeNames.map((name, index) => (
          <div
            key={index}
            className="border p-4 cursor-pointer bg-[#861F41] text-white rounded-xl"
            onClick={() =>
              handleClick(response.recipes[index], response.recipeNames[index])
            }
          >
            <img
              src={response.images[index]}
              //"https://www.destenaire.com/noaccess/wp-content/uploads/2014/10/8-Oddest-Food-Items-Featured-Image1.png"
              alt={name}
            />
            <h2 className="font-bold text-lg">{name}</h2>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-2 text-black max-h-screen overflow-auto">
          {selectedName}
        </h2>
        <p className="whitespace-break-spaces text-black">{selectedRecipe}</p>
      </Modal>
    </>
  );
};

export default RecipeDisplay;
