package com.kgruza.gateway_service.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class GatewayCorsConfig {
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Arrays.asList("*")); // Pozwala na wszystkie źródła za pomocą wzorców
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Pozwala na wszystkie metody HTTP
        config.setAllowedHeaders(Arrays.asList("*")); // Pozwala na wszystkie nagłówki
        config.setAllowCredentials(true); // Obsługuje ciasteczka (credentials)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Dotyczy wszystkich ścieżek
        return new CorsWebFilter(source);
    }
}
