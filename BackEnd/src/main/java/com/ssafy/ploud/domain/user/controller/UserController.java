package com.ssafy.ploud.domain.user.controller;

import com.ssafy.ploud.common.exception.DuplicateException;
import com.ssafy.ploud.common.exception.UserNotFoundException;
import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.user.dto.EmailVerifyReqDto;
import com.ssafy.ploud.domain.user.dto.FindIdReqDto;
import com.ssafy.ploud.domain.user.dto.FindIdResDto;
import com.ssafy.ploud.domain.user.dto.FindPwReqDto;
import com.ssafy.ploud.domain.user.dto.LoginReqDto;
import com.ssafy.ploud.domain.user.dto.LoginResDto;
import com.ssafy.ploud.domain.user.dto.SignUpReqDto;
import com.ssafy.ploud.domain.user.dto.UserInfoResDto;
import com.ssafy.ploud.domain.user.dto.UserInfoUpdateReqDto;
import com.ssafy.ploud.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "회원 관리 API", description = "회원가입, 로그인, 중복 검사, 회원 정보 수정")
@SecurityRequirement(name = "Bearer Authentication")
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
  public ApiResponse<LoginResDto> login(@RequestBody LoginReqDto reqDto) {
    try {
      LoginResDto loginRes = userService.login(reqDto);
      return ApiResponse.ok("로그인 성공", loginRes);
    } catch (UserNotFoundException e) {
      return ApiResponse.failure("입력이 올바른지 확인해주세요", ResponseCode.UNAUTHORIZED);
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
    return ApiResponse.failure("해당 닉네임이 이미 존재합니다", ResponseCode.CONFLICT);
  }

  @Operation(summary = "아이디 중복 검사")
  @PostMapping("/userId")
  public ApiResponse<?> isUserIdAvailable(@RequestBody Map<String, String> request) {
    String userId = request.get("userId");
    boolean isAvailable = userService.isUserIdAvailable(userId);
    if (isAvailable) {
      return ApiResponse.ok("OK");
    }
    return ApiResponse.failure("해당 아이디는 이미 존재합니다", ResponseCode.CONFLICT);
  }

  @Operation(summary = "이메일 중복 검사", description = "이메일 중복 검사를 진행합니다. 이메일을 사용할 수 있다면, 해당 이메일로 인증 코드를 전송합니다.")
  @PostMapping("/email")
  public ApiResponse<?> isUserEmailAvailable(@RequestBody Map<String, String> request) {
    String email = request.get("email");
    try {
      boolean isAvailable = userService.isUserEmailAvailable(email);
      if (isAvailable) {
        return ApiResponse.ok("이메일로 인증 코드 전송 성공");
      }
      return ApiResponse.failure("해당 이메일은 이미 존재합니다", ResponseCode.CONFLICT);
    } catch (MessagingException e) {
      e.printStackTrace();
      return ApiResponse.error("인증 코드 전송 실패");
    }
  }

  @Operation(summary = "이메일 인증코드 체크", description = "사용자 이메일로 전송한 인증코드와 사용자가 입력한 인증코드가 동일한지 검사합니다")
  @PostMapping("/verify-email")
  public ApiResponse<?> verifyCode(@RequestBody EmailVerifyReqDto reqDto) {
    if (userService.verifyEmail(reqDto.getEmail(), reqDto.getCode())) {
      return ApiResponse.ok("이메일 인증 완료");
    }
    return ApiResponse.failure("인증코드를 확인해주세요", ResponseCode.BAD_REQUEST);
  }

  @Operation(summary = "회원 정보 조회")
  @GetMapping("/profile")
  public ApiResponse<UserInfoResDto> findUserByUserId(
      @AuthenticationPrincipal UserDetails loginUser) {
    try {
      return ApiResponse.ok("회원 정보 조회 성공", userService.findUserByUserId(loginUser.getUsername()));
    } catch (UserNotFoundException e) {
      return ApiResponse.failure("해당 유저가 존재하지 않습니다", ResponseCode.NOT_FOUND);
    } catch (Exception e) {
      return ApiResponse.error("회원 정보 조회 중 에러 발생");
    }
  }

  @Operation(summary = "닉네임 수정")
  @PatchMapping("/nickname")
  public ApiResponse<Map<String, String>> updateUserNickname(
      @AuthenticationPrincipal UserDetails loginUser,
      @RequestBody UserInfoUpdateReqDto reqDto) {
    try {
      Map<String, String> res = new HashMap<>();
      res.put("nickname", userService.updateUserNickname(loginUser.getUsername(),
          reqDto.getNewValue()));
      return ApiResponse.ok("닉네임 수정 완료", res);
    } catch (UserNotFoundException e) {
      return ApiResponse.failure("해당 유저가 존재하지 않습니다", ResponseCode.NOT_FOUND);
    } catch (DuplicateException e) {
      return ApiResponse.failure("이미 등록된 닉네임입니다.", ResponseCode.CONFLICT);
    } catch (Exception e) {
      e.printStackTrace();
      return ApiResponse.error("닉네임 수정 중 오류 발생");
    }
  }

  @Operation(summary = "회원 프로필 사진 수정", description = "window C 폴더 하위에 ploud_img 폴더를 먼저 만들어야 합니다")
  @PostMapping(value = "/img", consumes = {MediaType.APPLICATION_JSON_VALUE,
      MediaType.MULTIPART_FORM_DATA_VALUE})
  public ApiResponse<?> updateUserProfileImg(
      @AuthenticationPrincipal UserDetails loginUser,
      @RequestPart(value = "file", required = false) MultipartFile multipartFile)
      throws IOException {
    try {
      Map<String, byte[]> res = new HashMap<>();
      res.put("profileImg", userService.saveProfilePicture(multipartFile, loginUser.getUsername()));
      return ApiResponse.ok("프로필 사진 수정 완료", res);
    } catch (UserNotFoundException e) {
      return ApiResponse.failure("해당 사용자가 존재하지 않습니다", ResponseCode.NOT_FOUND);
    } catch (Exception e) {
      e.printStackTrace();
      return ApiResponse.error("프로필 사진 수정 중 오류 발생");
    }
  }

  @Operation(summary = "비밀번호 변경")
  @PatchMapping("/pw")
  public ApiResponse<?> updateUserPassword(@AuthenticationPrincipal UserDetails loginUser,
      @RequestBody UserInfoUpdateReqDto reqDto) {
    userService.updateUserPassword(loginUser.getUsername(), reqDto.getNewValue());
    return ApiResponse.ok("비밀번호 수정 완료");
  }

  @Operation(summary = "사용자 인증", description = "request Header의 Authorization에 Bearer {accessToken}을 추가해서 요청을 보내면 사용자 아이디를 조회 가능")
  @GetMapping("/getUserId")
  public ApiResponse<?> getUserId(@AuthenticationPrincipal UserDetails loginUser) {
    return ApiResponse.ok("로그인 사용자 아이디", loginUser.getUsername());
  }

  @Operation(summary = "아이디 찾기", description = "사용자가 입력한 이메일, 이름을 바탕으로 사용자의 아이디를 반환합니다")
  @PostMapping("/find-id")
  public ApiResponse<FindIdResDto> getUserIdByEmailAndName(@RequestBody FindIdReqDto reqDto) {
    try {
      return ApiResponse.ok("아이디 조회 성공",
          userService.getUserIdByEmailAndName(reqDto.getEmail(), reqDto.getName()));
    } catch (UserNotFoundException e) {
      return ApiResponse.failure("사용자 정보와 일치하는 아이디가 없습니다", ResponseCode.NOT_FOUND);
    }
  }

  @Operation(summary = "비밀번호 찾기", description = "사용자가 회원가입 시 입력한 이메일로 임시 비밀번호를 전송합니다")
  @PostMapping("/find-pw")
  public ApiResponse<?> getUserPasswordByEmailAndId(@RequestBody FindPwReqDto reqDto) {
    try {
      userService.getUserPasswordByEmailAndId(reqDto.getEmail(), reqDto.getUserId());
    } catch (UserNotFoundException e) {
      e.printStackTrace();
      return ApiResponse.failure("유저가 존재하지 않습니다", ResponseCode.NOT_FOUND);
    } catch (MessagingException e) {
      e.printStackTrace();
      return ApiResponse.error("메일을 전송하지 못했습니다");
    }
    return ApiResponse.ok("임시 비밀번호 발급 성공");
  }
}
