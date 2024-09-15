"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const spicesList = [
  "Black Pepper",
  "Cardamom",
  "Cayenne Pepper",
  "Cinnamon",
  "Cloves",
  "Crushed Red Pepper",
  "Cumin",
  "Curry Powder",
  "Garlic Powder",
  "Ginger",
  "Italian Seasoning",
  "Nutmeg",
  "Onion Powder",
  "Oregano",
  "Paprika",
  "Rosemary",
  "Salt",
  "Sage",
  "Smoked Paprika",
  "Thyme",
  "Turmeric",
];

const dietsList = [
  "Balanced",
  "High-Fiber",
  "High-Protein",
  "Low-Carb",
  "Low-Fat",
  "Low-Sodium",
  "Halal",
  "Kosher",
  "Pescatarian",
  "Vegan",
  "Vegetarian",
  "Keto",
  "Paleo",
];

const healthList = [
  "Alcohol-free",

  "Kidney friendly",
  "Low-potassium",
  "No oil added",
  "Low-sugar",

  "Pork-free",
  "Red meat-free",
  "Sugar-conscious",
];

function SpicesPage() {
  const [selectedSpices, setSelectedSpices] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedHealth, setSelectedHealth] = useState([]);
  const router = useRouter();

  const toggleSelection = (item, list, setList) => {
    setList((prevList) =>
      prevList.includes(item)
        ? prevList.filter((i) => i !== item)
        : [...prevList, item]
    );
  };

  const clearSelection = (setList) => {
    setList([]);
  };

  const handleContinue = () => {
    localStorage.setItem("spices_string", JSON.stringify(selectedSpices));
    localStorage.setItem("diets_string", JSON.stringify(selectedDiets));
    localStorage.setItem("health_string", JSON.stringify(selectedHealth));
  };

  const renderSection = (title, items, selected, setSelected) => (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="flex flex-wrap gap-2 text-black">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => toggleSelection(item, selected, setSelected)}
            className={`px-3 py-1 rounded ${
              selected.includes(item)
                ? "bg-[#E5751F] text-white"
                : "bg-gray-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        onClick={() => clearSelection(setSelected)}
        className="mt-2 px-4 py-2 bg-[#861F41] text-white rounded"
      >
        Clear {title}
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-[#3b3b3b]">
      <h1 className="text-3xl font-bold mb-6">Select Your Preferences</h1>

      {renderSection("Spices", spicesList, selectedSpices, setSelectedSpices)}
      {renderSection("Diets", dietsList, selectedDiets, setSelectedDiets)}
      {renderSection("Health", healthList, selectedHealth, setSelectedHealth)}

      <button
        onClick={() => {
          handleContinue();
          router.push("/ingredients");
        }}
        className="mt-8 px-6 py-3 bg-green-500 text-white rounded text-lg font-semibold"
      >
        Continue
      </button>
    </div>
  );
}

export default SpicesPage;
