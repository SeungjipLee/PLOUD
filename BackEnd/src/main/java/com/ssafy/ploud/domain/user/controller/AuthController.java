package com.ssafy.ploud.domain.user.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.user.dto.GoogleLoginReqDto;
import com.ssafy.ploud.domain.user.dto.JwtAuthResponse;
import com.ssafy.ploud.domain.user.security.AuthService;
import com.ssafy.ploud.domain.user.security.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "토큰 관리 API", description = "access token 재발급")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;
  private final JwtTokenProvider jwtTokenProvider;

  @SecurityRequirement(name = "Bearer Authentication")
  @Operation(summary = "access token 재발급", description = "access token이 만료되면 JWT token expired 메시지를 클라이언트로 보냅니다. 클라이언트에서 요청 header에 Bearer {refresh token}을 보내면 access token을 재발급합니다. 만약 refresh token도 만료되었을 경우 JWT token expired 메시지를 클라이언트로 보냅니다.")
  @GetMapping("/reissue")
  public ApiResponse<JwtAuthResponse> reissueAccessToken(HttpServletRequest request) {
    return ApiResponse.ok("access token 재발급 완료", jwtTokenProvider.reissueAccessToken(request));
  }

  @Operation(summary = "google 소셜 로그인", description = "기존 회원이라면 로그인 처리, 신규 회원이라면 회원가입 페이지로 이동해야 한다")
  @PostMapping("/google")
  public ApiResponse<?> googleLogin(@RequestBody GoogleLoginReqDto reqDto) {
    return ApiResponse.ok("로그인 성공", authService.loginByGoogleAccount(reqDto.getToken()));
  }


}
