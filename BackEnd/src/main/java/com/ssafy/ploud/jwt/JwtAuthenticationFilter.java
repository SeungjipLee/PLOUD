package com.ssafy.ploud.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private JwtTokenProvider jwtTokenProvider;

  private UserDetailsService userDetailsService;

  public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider, UserDetailsService userDetailsService) {
    this.jwtTokenProvider = jwtTokenProvider;
    this.userDetailsService = userDetailsService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    // 헤더에서 가져온 토큰이 유효한지 검증
    // 토큰을 이용하여 계정을 가져오고 유저정보를 가져와 SecurityContext에 Authentication(인증 객체) 저장

    // Get JWT token from HTTP request
    String token = getTokenFromRequest(request);

    // Validate Token
    if (token != null && StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
      // get username from token
      String userId = jwtTokenProvider.getUserId(token);
      System.out.println("Filter: " + userId);
      UserDetails userDetails = userDetailsService.loadUserByUsername(userId);

      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
          userDetails,
          null,
          userDetails.getAuthorities()
      );

      authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

      SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
    // TODO: access token 만료되었다면 refresh token 재발급

    filterChain.doFilter(request, response);
  }

  private String getTokenFromRequest(HttpServletRequest request){
    String bearerToken = request.getHeader("Authorization");

    if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
      return bearerToken.substring(7);
    }

    return null;
  }
}
