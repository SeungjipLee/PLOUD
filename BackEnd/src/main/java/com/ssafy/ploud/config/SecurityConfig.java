package com.ssafy.ploud.config;

import com.ssafy.ploud.domain.user.security.JwtAuthenticationFilter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtAuthenticationFilter authenticationFilter;

  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
      throws Exception {
    return configuration.getAuthenticationManager();
  }

  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) -> web.ignoring()
        .requestMatchers("/api/**")
        .requestMatchers("/", "/login", "/join")
        .requestMatchers(
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/configuration/ui",
            "/configuration/security",
            "/v3/api-docs/**",
            "swagger-resources",
            "/swagger-resources/**",
            "/webjars/**"
        );
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // csrf disable
    http
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .csrf(AbstractHttpConfigurer::disable)
        .cors((cors) -> cors.configurationSource(corsConfigurationSource()))
        .formLogin(AbstractHttpConfigurer::disable)
        .httpBasic(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(auth -> auth
                .requestMatchers("/swagger", "/swagger-ui.html", "/swagger-ui/**", "/api-docs",
                    "/api-docs/**", "/v3/api-docs/**")
                .permitAll()
//                .requestMatchers("/api/user/signup", "/api/user/login", "/api/user/userId",
//                    "/api/user/email", "/api/user/nickname")
//                .permitAll()
                .requestMatchers("/**")
                .permitAll()
//                .anyRequest()
//                .authenticated()
        )
        .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
    ;

    return http.build();

  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowCredentials(true);
//    config.setAllowedOrigins(List.of("https://i10e207.p.ssafy.io"));
    config.setAllowedOrigins(List.of("http://localhost:3000"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setExposedHeaders(List.of("*"));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;

  }

}
