package com.recipe.recipeai.controller;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.models.ChatCompletionsOptions;
import com.azure.ai.openai.models.ChatCompletionsResponseFormat;
import com.azure.ai.openai.models.ChatRequestMessage;
import com.azure.ai.openai.models.ChatRequestUserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.util.Collections;
import java.util.List;

public abstract class BaseController {
    protected OpenAIClient openAIClient;
    protected BaseController(OpenAIClient openAIClient) {
        this.openAIClient = openAIClient;
    }
    @Value("${spring.ai.azure.openai.model}")
    protected String modelName;
    @Value("${spring.ai.azure.openai.tokens}")
    protected int tokensLimit;
    @Value("${spring.ai.azure.openai.temperature}")
    protected double temperature;
    protected ChatCompletionsOptions getChatCompletionsOptions(String prompt) {
        // Define the options for text generation
        List<ChatRequestMessage> messages = Collections.singletonList(new ChatRequestUserMessage(prompt));
        ChatCompletionsOptions options = new ChatCompletionsOptions(messages);
        options.setMaxTokens(tokensLimit);
        options.setTemperature(temperature);
        return options;
    }
}
