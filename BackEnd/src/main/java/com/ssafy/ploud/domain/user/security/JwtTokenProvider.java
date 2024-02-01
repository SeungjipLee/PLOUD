package com.ssafy.ploud.domain.user.security;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.dto.JwtAuthResponse;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j
@Component
public class JwtTokenProvider {

  @Value("${spring.jwt.secret}")
  private String jwtSecret;

  @Value("${spring.jwt.accessTokenExperation}")
  private long accessTokenExpirationDate;

  @Value("${spring.jwt.refreshTokenExperation}")
  private long refreshTokenExpirationDate;

  @Autowired
  private UserRepository userRepository;

  // generate JWT Token
  public JwtAuthResponse generateToken(String userId) {

    // access token 생성
    String accessToken = generateToken(userId, accessTokenExpirationDate);
    // refresh token 생성
    String refreshToken = generateToken(userId, refreshTokenExpirationDate);

    return new JwtAuthResponse(refreshToken, accessToken, "Bearer");
  }

  private String generateToken(String userId, Long expireDate) {
    Date currentDate = new Date();

    return Jwts.builder()
        .subject(userId)
        .issuedAt(new Date())
        .expiration(new Date(currentDate.getTime() + expireDate))
        .signWith(key())
        .compact();
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
    } catch (MalformedJwtException e) {
      log.error("Invalid JWT token");
      throw new CustomException(ResponseCode.INVALID_JWT_TOKEN);
    } catch (UnsupportedJwtException e) {
      log.error("Unsupported JWT token");
      throw new CustomException(ResponseCode.UNSUPPORTED_JWT_TOKEN);
    } catch (IllegalArgumentException e) {
      log.error("JWT claims string is empty");
      throw new CustomException(ResponseCode.JWT_CLAIM_EMPTY);
    } catch (SignatureException e) {
      log.error("JWS signature validation fails");
      throw new CustomException(ResponseCode.JWT_VALIDATION_FAIL);
    } catch (ExpiredJwtException e) {
      log.error("JWT token expired");
      throw new CustomException(ResponseCode.JWT_TOKEN_EXPIRED);
    }
  }

  public JwtAuthResponse reissueAccessToken(HttpServletRequest request) {
    String refreshToken = getTokenFromRequest(request);
    try {
      if (validateToken(refreshToken)) {
        String userId = getUserId(refreshToken);
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));
        if (refreshToken.equals(user.getRefreshToken())) {
          // re-issue access token
          return JwtAuthResponse
              .builder()
              .refreshToken(refreshToken)
              .accessToken(generateToken(userId, accessTokenExpirationDate))
              .tokenType("Bearer")
              .build();
        } else {
          throw new CustomException(ResponseCode.WRONG_REFRESH_TOKEN);
        }
      }
    } catch (ExpiredJwtException e) {
      throw new CustomException(ResponseCode.REFRESH_TOKEN_EXPIRED);
    } catch (Exception e) {
      throw new CustomException(ResponseCode.WRONG_REFRESH_TOKEN);
    }
    return null;
  }

  public String getTokenFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");

    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }

    return null;
  }

}
