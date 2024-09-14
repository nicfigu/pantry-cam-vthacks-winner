import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Recipe Finder
        </Link>
        <div>
          <Link to="/" className="mr-4">
            Spices
          </Link>
          <Link to="/ingredients" className="mr-4">
            Ingredients
          </Link>
          <Link to="/recipes">Recipes</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
