package com.ssafy.ploud.domain.user.security;

import com.ssafy.ploud.common.exception.CustomException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.apache.logging.log4j.util.Strings;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private JwtTokenProvider jwtTokenProvider;
  private CustomUserDetailsService customUserDetailsService;

  public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider,
      CustomUserDetailsService customUserDetailsService) {
    this.jwtTokenProvider = jwtTokenProvider;
    this.customUserDetailsService = customUserDetailsService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    // 헤더에서 가져온 토큰이 유효한지 검증
    // 토큰을 이용하여 계정을 가져오고 유저정보를 가져와 SecurityContext에 Authentication(인증 객체) 저장

    try {
      // Get JWT token from HTTP request
      String token = jwtTokenProvider.getTokenFromRequest(request);
      if (!Strings.isEmpty(token)) {

        jwtTokenProvider.validateToken(token);

        // get username from token
        String userId = jwtTokenProvider.getUserId(token);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(userId);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
            userDetails,
            token,
            userDetails.getAuthorities()
        );
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      }
    } catch (CustomException e) {
      setResponse(response, e.getMessage());
      return;
    }
    filterChain.doFilter(request, response);
  }

  public void setResponse(HttpServletResponse response, String msg) throws IOException {
    response.setContentType("application/json;charset=UTF-8");
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    response.getWriter()
        .write("{\"status\":401, \"message\": \"" + msg + "\", \"data\" : \"null\"}");
  }

}
