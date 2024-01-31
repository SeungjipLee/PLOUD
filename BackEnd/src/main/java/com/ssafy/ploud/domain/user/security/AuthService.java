package com.ssafy.ploud.domain.user.security;

import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.dto.JwtAuthResponse;
import com.ssafy.ploud.domain.user.dto.LoginResDto;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import com.ssafy.ploud.domain.user.service.UserService;
import java.util.Base64;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

//  @Value("${spring.oauth2.google.url}")
//  private String GOOGLE_SNS_LOGIN_URL;
//
//  @Value("${spring.oauth2.google.client-id}")
//  private String GOOGLE_SNS_CLIENT_ID;
//
//  @Value("${spring.oauth2.google.callback-url}")
//  private String GOOGLE_SNS_CALLBACK_URL;
//
//  @Value("${spring.oauth2.google.client-secret}")
//  private String GOOGLE_SNS_CLIENT_SECRET;
//
//  @Value("${spring.oauth2.google.scope}")
//  private String GOOGLE_DATA_ACCESS_SCOPE;

  private final UserService userService;
  private final UserRepository userRepository;
  private final JwtTokenProvider jwtTokenProvider;

  public LoginResDto loginByGoogleAccount(String token) {

    String[] check = token.split("\\.");
    Base64.Decoder decoder = Base64.getDecoder();
    String payload = new String(decoder.decode(check[1]));

    try {
      JSONObject jsonObject = new JSONObject(payload);
      String email = jsonObject.getString("email");
      String profileImg = jsonObject.getString("picture");

      String userId  = userService.getUserIdByEmail(email);
      if(userId != null) {
        // 로그인
        JwtAuthResponse res = jwtTokenProvider.generateToken(userId);
        // user 테이블 refresh token 변경
        UserEntity user = userRepository.findById(userId).get();
        user.setRefreshToken(res.getRefreshToken());

        // LoginResDto 반환
        return new LoginResDto(res.getRefreshToken(), res.getAccessToken(), "Bearer", user.getNickname());
      }

    } catch(Exception e) {
      e.printStackTrace();
    }

    return null;
  }

}
