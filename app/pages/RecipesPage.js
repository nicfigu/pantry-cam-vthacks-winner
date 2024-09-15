import React, { useEffect, useState, useCallback } from "react";
import RecipesLoading from "../components/RecipesLoading";
import RecipeDisplay from "../components/RecipeDisplay";
import RecipeError from "../components/RecipeError";

const RecipesPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(false);

  const getRecipes = useCallback((requestBody) => {
    setIsLoaded(false);
    setError(false);
    fetch(
      "http://recipe-ai-1726371321357.azurewebsites.net/api/v1/recipes/generateFull",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          data.forEach((recipe) => {
            console.log(`Recipe Name: ${recipe.name}`);
            console.log(`Content: ${recipe.content}`);
          });
          setResponse(data);
        } else {
          console.error("Received data is not an array:", data);
          throw new Error("Received data is not in the expected format");
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        //setError(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    const requestBody = {
      spices: JSON.parse(localStorage.getItem("spices_string") || "[]"),
      dietRestrictions: JSON.parse(
        localStorage.getItem("diets_string") || "[]"
      ),
      preferences: JSON.parse(localStorage.getItem("health_string") || "[]"),
      ingredients: JSON.parse(localStorage.getItem("ings_string") || "[]"),
    };
    getRecipes(requestBody);
  }, [getRecipes]);

  if (!isLoaded) return <RecipesLoading />;
  if (error) return <RecipeError />;
  return <RecipeDisplay response={response} />;
};

export default RecipesPage;
