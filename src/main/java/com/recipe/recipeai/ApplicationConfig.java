package com.recipe.recipeai;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;

import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.http.policy.HttpLogOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {
    @Value("${spring.ai.azure.openai.api-key}")
    private String apiKey;
    @Value("${spring.ai.azure.openai.endpoint}")
    private String apiEndpoint;
    @Bean
    public OpenAIClient openAIClient() {
        return new OpenAIClientBuilder().endpoint(apiEndpoint).httpLogOptions(new HttpLogOptions()).credential(new AzureKeyCredential(apiKey)).buildClient();
    }

}
