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
    <div className="flex flex-col h-screen w-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#23486F] via-[#192532] to-[#10131C]">
      <div className="w-full">
        <img
          src="/logo.png"
          alt="logo"
          className="mx-auto"
          style={{ width: "80%", maxHeight: "16rem", objectFit: "contain" }}
        />
      </div>
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
