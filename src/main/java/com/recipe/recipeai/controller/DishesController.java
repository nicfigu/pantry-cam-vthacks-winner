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
        StringBuilder stringBuilder = new StringBuilder().append(String.format("I have the following ingredients: %s. ", details.ingredientsToString()));
        if (details.dietRestrictions() != null && !details.dietRestrictions().isEmpty())
            stringBuilder.append(String.format("My dietary restrictions are: %s. ", details.dietRestrictionsToString()));
        if (details.preferences() != null && !details.preferences().isEmpty())
            stringBuilder.append(String.format("My preferences include: %s. ", details.preferencesToString()));
        if (details.spices() != null && !details.spices().isEmpty())
            stringBuilder.append(String.format("I would like to use these spices: %s. ", details.spicesToString()));

        stringBuilder.append("Please give me 3-4 dish names with these ingredients. ");
        if (details.dietRestrictions() != null || details.preferences() != null)
            stringBuilder.append("These dishes should align with my restrictions and/or preferences. ");
        if (details.spices() != null)
            stringBuilder.append("I would like to use these spices. ");
        String prompt = stringBuilder.append("Return the response in the form of string array.").toString();

        ChatCompletionsOptions options = getChatCompletionsOptions(prompt);
        // Call Azure OpenAI to get response
        ChatCompletions completions = openAIClient.getChatCompletions(modelName, options);
        // Fetch the text content
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(completions.getChoices().get(0).getMessage().getContent().strip());
    }

}
