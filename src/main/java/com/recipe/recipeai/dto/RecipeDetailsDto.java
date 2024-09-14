package com.recipe.recipeai.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;
public record RecipeDetailsDto(@NotNull @NotEmpty(message = "there should be at least 1 ingredient") List<String> ingredients,
                               List<String> dietRestrictions, List<String> spices, List<String> preferences) {

    public String ingredientsToString() {
        return ingredients.toString().replace("[", "").replace("]", "");
    }
    public String dietRestrictionsToString() {
        return dietRestrictions.toString().replace("[", "").replace("]", "");
    }
    public String spicesToString() {
        return spices.toString().replace("[", "").replace("]", "");
    }
    public String preferencesToString() {
        return preferences.toString().replace("[", "").replace("]", "");
    }
}
