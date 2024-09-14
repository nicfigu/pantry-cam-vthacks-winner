package com.recipe.recipeai;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.models.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/recipes")
public class RecipesController {
    private final OpenAIClient openAIClient;
    @Value("${spring.ai.azure.openai.model}")
    private String modelName;
    @Value("${spring.ai.azure.openai.tokens}")
    private int tokensLimit;
    @Value("${spring.ai.azure.openai.temperature}")
    private double temperature;
    public RecipesController(OpenAIClient openAIClient) {
        this.openAIClient = openAIClient;
    }

    @PostMapping("/generate")
    public String generateRecipe(@RequestBody @Valid RecipeDetails details){
        // The base prompt for sending to model
        String initialPrompt = """
                "I want to get a recipe for a healthy dish.
                I have the following ingredients: %s.
                My dietary restrictions are: %s.
                My preferences include: %s.
                I would like to use these spices: %s.
                Please create a recipe that aligns with my restrictions and preferences while making use of the ingredients and spices I have.
                """;
        ChatCompletionsOptions options = getChatCompletionsOptions(details, initialPrompt);
        // Call Azure OpenAI to get response
        ChatCompletions completions = openAIClient.getChatCompletions(modelName, options);
        // Fetch the text content
        return completions.getChoices().getFirst().getMessage().getContent().strip();
    }


    private ChatCompletionsOptions getChatCompletionsOptions(RecipeDetails details, String initialPrompt) {
        String prompt = String.format(initialPrompt, details.ingredientsToString(), details.dietRestrictionsToString(), details.preferencesToString(),
                        details.spicesToString());
        // Define the options for text generation
        List<ChatRequestMessage> messages = Collections.singletonList(new ChatRequestUserMessage(prompt));
        ChatCompletionsOptions options = new ChatCompletionsOptions(messages);
        options.setMaxTokens(tokensLimit);
        options.setTemperature(temperature);
        return options;
    }

}
