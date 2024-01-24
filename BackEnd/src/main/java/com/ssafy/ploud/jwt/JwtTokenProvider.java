package com.ssafy.ploud.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
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
  private long jwtExpirationDate;

  // generate JWT Token
  public String generateToken(Authentication authentication) {

    String userId = authentication.getName();
    Date currentDate = new Date();
    Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

    String token = Jwts.builder()
        .subject(userId)
        .issuedAt(new Date())
        .expiration(expireDate)
        .signWith(key())
        .compact();

    return token;
  }

  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  // get userId from Jwt Token
  public String getUserId(String token) {
    return Jwts.parser()
        .verifyWith((SecretKey) key())
        .build()
        .parseSignedClaims(token)
        .getPayload()
        .getSubject();
  }

  // validate Jwt Token
  public boolean validateToken(String token) {
    Jwts.parser()
        .verifyWith((SecretKey) key())
        .build()
        .parse(token);
    return true;
  }
}
