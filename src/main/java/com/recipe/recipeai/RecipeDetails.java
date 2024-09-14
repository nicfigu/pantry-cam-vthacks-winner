package com.recipe.recipeai;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;
public record RecipeDetails(@NotNull @NotEmpty(message = "there should be at least 1 ingredient") List<String> ingredients,
                            @NotNull @NotEmpty(message = "there should be at least 1 dietary restriction") List<String> dietRestrictions,
                            @NotNull @NotEmpty(message = "there should be at least 1 spice") List<String> spices,
                            @NotNull @NotEmpty(message = "there should be at least 1 preference") List<String> preferences){

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
