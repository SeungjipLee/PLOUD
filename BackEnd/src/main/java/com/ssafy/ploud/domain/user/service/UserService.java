package com.ssafy.ploud.domain.user.service;

import com.ssafy.ploud.domain.user.dto.JwtAuthResponse;
import com.ssafy.ploud.domain.user.dto.LoginReqDto;
import com.ssafy.ploud.domain.user.dto.SignUpReqDto;
import com.ssafy.ploud.domain.user.dto.UserInfoResDto;
import com.ssafy.ploud.domain.user.dto.UserInfoUpdateReqDto;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

  public void signUp(SignUpReqDto reqDto);

  public JwtAuthResponse login(LoginReqDto reqDto);

  public boolean isUserIdAvailable(String userId); // 아이디 중복 체크

  public boolean isNicknameAvailable(String nickname); // 닉네임 중복 체크

  public boolean isUserEmailAvailable(String userEmail); // 이메일 중복 체크

  public UserInfoResDto findUserByUserId(String userId); // 회원 정보 조회

  public String updateUserNickname(UserInfoUpdateReqDto reqDto); // 회원 닉네임 수정

  public byte[] saveProfilePicture(MultipartFile file, String userId)
      throws IOException; // 프로필 사진 등록
}
