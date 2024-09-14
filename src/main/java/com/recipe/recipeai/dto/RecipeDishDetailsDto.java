package com.recipe.recipeai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record RecipeDishDetailsDto(@NotNull @NotEmpty(message = "there should be at least 1 ingredient") List<String> ingredients,
                                   @NotBlank(message = "Dish name must be included") String dishName) {
    public String ingredientsToString() {
        return ingredients.toString().replace("[", "").replace("]", "");
    }
}
