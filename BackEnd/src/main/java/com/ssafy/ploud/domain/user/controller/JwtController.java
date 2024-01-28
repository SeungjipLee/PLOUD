package com.ssafy.ploud.domain.user.controller;

import com.ssafy.ploud.common.exception.JwtCustomException;
import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.common.response.ResponseStatus;
import com.ssafy.ploud.domain.user.dto.JwtAuthResponse;
import com.ssafy.ploud.domain.user.jwt.JwtTokenProvider;
import com.ssafy.ploud.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "토큰 관리 API", description = "access token 재발급")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class JwtController {

  private final UserService userService;
  private final JwtTokenProvider jwtTokenProvider;

  @Operation(summary = "access token 재발급", description = "access token이 만료되면 JWT token expired 메시지를 클라이언트로 보냅니다. 클라이언트에서 요청 header에 Bearer {refresh token}을 보내면 access token을 재발급합니다. 만약 refresh token도 만료되었을 경우 JWT token expired 메시지를 클라이언트로 보냅니다.")
  @GetMapping("/reissue")
  public ApiResponse<JwtAuthResponse> reissueAccessToken(HttpServletRequest request,
      HttpServletResponse response) {
    try {
      return ApiResponse.ok("access token 재발급 완료", jwtTokenProvider.reissueAccessToken(request));
    } catch (JwtCustomException e) {
      System.out.println(e.getMessage());
      return ApiResponse.failure(e.getMessage(), ResponseStatus.UNAUTHORIZED);
    }

  }


}
