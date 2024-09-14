package com.recipe.recipeai.controller;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.models.*;
import com.recipe.recipeai.dto.RecipeDetailsDto;
import com.recipe.recipeai.dto.RecipeDishDetailsDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/recipes")
public class RecipesController extends BaseController {
    protected RecipesController(OpenAIClient openAIClient) {
        super(openAIClient);
    }
    @PostMapping("/generate")
    public ResponseEntity<String> generateRecipe(@RequestBody @Valid RecipeDishDetailsDto details){
        // The base prompt for sending to model
        String prompt = String.format("""
                I want to make %s. It must have %s in it. Give me the full recipe for this dish.
                Include calories, protein, fats and carbs per serving.""", details.dishName(), details.ingredients());

        ChatCompletionsOptions options = getChatCompletionsOptions(prompt);
        // Call Azure OpenAI to get response
        ChatCompletions completions = openAIClient.getChatCompletions(modelName, options);
        // Fetch the text content
        return ResponseEntity.ok(completions.getChoices().getFirst().getMessage().getContent().strip());
    }
}
