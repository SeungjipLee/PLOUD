package com.ssafy.ploud.domain.user.controller;

import com.ssafy.ploud.common.exception.UserNotFoundException;
import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.common.response.ResponseStatus;
import com.ssafy.ploud.domain.user.dto.JwtAuthResponse;
import com.ssafy.ploud.domain.user.dto.LoginReqDto;
import com.ssafy.ploud.domain.user.dto.SignUpReqDto;
import com.ssafy.ploud.domain.user.dto.UserInfoResDto;
import com.ssafy.ploud.domain.user.dto.UserInfoUpdateReqDto;
import com.ssafy.ploud.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "회원 관리 API", description = "회원가입, 로그인, 중복 검사, 회원 정보 수정")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Slf4j
public class UserController {

  private final UserService userService;

  @Operation(summary = "회원가입")
  @PostMapping("/signup")
  public ApiResponse<?> signUp(@RequestBody SignUpReqDto reqDto) {
    userService.signUp(reqDto);
    return ApiResponse.ok("회원가입 성공");
  }

  @Operation(summary = "로그인", description = "아이디, 비밀번호로 로그인한다")
  @PostMapping("/login")
  public ApiResponse<JwtAuthResponse> login(@RequestBody LoginReqDto reqDto) {
    try {
      JwtAuthResponse token = userService.login(reqDto);
      return ApiResponse.ok("로그인 성공", token);
    } catch (AuthenticationException e) {
      return ApiResponse.failure("입력이 올바른지 확인해주세요", ResponseStatus.UNAUTHORIZED);
    } catch (Exception e) {
      e.printStackTrace();
      return ApiResponse.error("로그인 에러");
    }

  }

  @Operation(summary = "닉네임 중복 검사")
  @PostMapping("/nickname")
  public ApiResponse<?> isNicknameAvailable(@RequestBody Map<String, String> request) {
    String nickname = request.get("nickname");
    boolean isAvailable = userService.isNicknameAvailable(nickname);
    if (isAvailable) {
      return ApiResponse.ok("OK");
    }
    return ApiResponse.failure("해당 닉네임이 이미 존재합니다", ResponseStatus.CONFLICT);
  }

  @Operation(summary = "아이디 중복 검사")
  @PostMapping("/userId")
  public ApiResponse<?> isUserIdAvailable(@RequestBody Map<String, String> request) {
    String userId = request.get("userId");
    boolean isAvailable = userService.isUserIdAvailable(userId);
    if (isAvailable) {
      return ApiResponse.ok("OK");
    }
    return ApiResponse.failure("해당 아이디는 이미 존재합니다", ResponseStatus.CONFLICT);
  }

  @Operation(summary = "이메일 중복 검사")
  @PostMapping("/email")
  public ApiResponse<?> isUserEmailAvailable(@RequestBody Map<String, String> request) {
    String email = request.get("email");
    boolean isAvailable = userService.isUserEmailAvailable(email);
    if (isAvailable) {
      return ApiResponse.ok("OK");
    }
    return ApiResponse.failure("해당 이메일은 이미 존재합니다", ResponseStatus.CONFLICT);
  }

  @Operation(summary = "회원 정보 조회")
  @GetMapping("profile/{userId}")
  public ApiResponse<UserInfoResDto> findUserByUserId(@PathVariable("userId") String userId) {
    try {
      return ApiResponse.ok("회원 정보 조회 성공", userService.findUserByUserId(userId));
    } catch (UserNotFoundException e) {
      return ApiResponse.failure("해당 유저가 존재하지 않습니다", ResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      return ApiResponse.error("회원 정보 조회 중 에러 발생");
    }
  }

  @Operation(summary = "회원 정보 수정", description = "회원 정보(닉네임) 수정")
  @PatchMapping("/nickname")
  public ApiResponse<String> updateUserNickname(@RequestBody UserInfoUpdateReqDto reqDto) {
    try {
      return ApiResponse.ok("닉네임 수정 완료", userService.updateUserNickname(reqDto));
    } catch (UserNotFoundException e) {
      return ApiResponse.failure("해당 유저가 존재하지 않습니다", ResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      e.printStackTrace();
      return ApiResponse.error("닉네임 수정 중 오류 발생");
    }
  }

}
