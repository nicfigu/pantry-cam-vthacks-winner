import React, { useState, useEffect } from "react";

function IngredientsPage() {
  const [hasItems, setHasItems] = useState(false);

  useEffect(() => {
    // Check if there are items in localStorage when the component mounts
    const items = JSON.parse(localStorage.getItem("ings_string")) || [];
    setHasItems(items.length > 0);

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleStorageChange = (e) => {
    if (e.key === "ings_string") {
      const items = JSON.parse(e.newValue) || [];
      setHasItems(items.length > 0);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#3f3f3f]">
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
