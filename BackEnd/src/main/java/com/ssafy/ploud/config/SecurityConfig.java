package com.ssafy.ploud.config;

import com.ssafy.ploud.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.ploud.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private JwtAuthenticationEntryPoint authenticationEntryPoint;
  private JwtAuthenticationFilter authenticationFilter;

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
        .requestMatchers("/", "/login", "/join");
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // csrf disable
    http
        .csrf((auth) -> auth.disable()); // session을 stateless로 관리

    http
        .formLogin((auth) -> auth.disable());

    http
        .httpBasic((auth) -> auth.disable());

    http
        .authorizeHttpRequests((authorize) -> {
          authorize.requestMatchers("/api/**").permitAll();
          authorize.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
          authorize.anyRequest().authenticated();
        }).httpBasic(Customizer.withDefaults());

    http
        .exceptionHandling(exception -> exception
            .authenticationEntryPoint(authenticationEntryPoint));

    http
        .sessionManagement((session) -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return http.build();
  }

}
