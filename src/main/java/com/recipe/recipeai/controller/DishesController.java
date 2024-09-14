package com.recipe.recipeai.controller;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.models.*;
import com.recipe.recipeai.dto.RecipeDetailsDto;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/dishes")
public class DishesController extends BaseController {
    protected DishesController(OpenAIClient openAIClient) {
        super(openAIClient);
    }
    @PostMapping("/generate")
    public ResponseEntity<String> generateDishesList(@RequestBody @Valid RecipeDetailsDto details){
        // The base prompt for sending to model
        StringBuilder stringBuilder = new StringBuilder().append(String.format("I have the following ingredients: %s.\n", details.ingredientsToString()));
        if (details.dietRestrictions() != null && !details.dietRestrictions().isEmpty())
            stringBuilder.append(String.format("My dietary restrictions are: %s.\n", details.dietRestrictionsToString()));
        if (details.preferences() != null && !details.preferences().isEmpty())
            stringBuilder.append(String.format("My preferences include: %s.\n", details.preferencesToString()));
        if (details.spices() != null && !details.spices().isEmpty())
            stringBuilder.append(String.format("I would like to use these spices: %s.\n", details.spicesToString()));

        String prompt = stringBuilder.append(""" 
                Please give me a few dish names (no more than 3-4) that align with my restrictions and preferences
                while making use of the ingredients and spices I have (if the restrictions, preferences or spices not mentioned, use the ingredients only).
                Return the response in the form of string array.""").toString();

        ChatCompletionsOptions options = getChatCompletionsOptions(prompt);
        // Call Azure OpenAI to get response
        ChatCompletions completions = openAIClient.getChatCompletions(modelName, options);
        // Fetch the text content
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(completions.getChoices().getFirst().getMessage().getContent().strip());
    }
}
