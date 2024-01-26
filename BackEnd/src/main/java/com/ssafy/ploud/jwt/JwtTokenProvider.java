package com.ssafy.ploud.jwt;

import com.ssafy.ploud.domain.user.dto.JwtAuthResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

  @Value("${spring.jwt.secret}")
  private String jwtSecret;

  @Value("${spring.jwt.accessTokenExperation}")
  private long accessTokenExpirationDate;

  @Value("${spring.jwt.refreshTokenExperation}")
  private long refreshTokenExpirationDate;

  // generate JWT Token
  public JwtAuthResponse generateToken(Authentication authentication) {

    // access token 생성
    String userId = authentication.getName();
    Date currentDate = new Date();
    Date accessTokenExpireDate = new Date(currentDate.getTime() + accessTokenExpirationDate);

    String accessToken = Jwts.builder()
        .subject(userId)
        .issuedAt(new Date())
        .expiration(accessTokenExpireDate)
        .signWith(key())
        .compact();

    // refresh token 생성
    Date refreshTokenExpireDate = new Date(currentDate.getTime() + refreshTokenExpirationDate);
    String refreshToken = Jwts.builder()
        .subject(userId)
        .issuedAt(new Date())
        .expiration(refreshTokenExpireDate)
        .signWith(key())
        .compact();

    return new JwtAuthResponse(refreshToken, accessToken, "Bearer");
  }

  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  // get userId from Jwt Token
  public String getUserId(String accessToken) {
    return getAllClaims(accessToken)
        .getSubject();
  }

  public Claims getAllClaims(String token) {
    return Jwts.parser()
        .verifyWith((SecretKey) key())
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  // validate Jwt Token
  public boolean validateToken(String token) {
    try {
      Jwts.parser()
          .verifyWith((SecretKey) key())
          .build()
          .parse(token);
      return true;
    } catch (JwtException e) {
      e.printStackTrace();
      return false;
    }
  }

  public boolean isExpired(String token) {
    return getAllClaims(token)
        .getExpiration()
        .before(java.sql.Timestamp.valueOf(LocalDateTime.now()));
  }

}
