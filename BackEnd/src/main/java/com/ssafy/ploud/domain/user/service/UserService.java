package com.ssafy.ploud.domain.user.service;

import com.ssafy.ploud.domain.user.dto.JwtAuthResponse;
import com.ssafy.ploud.domain.user.dto.LoginReqDto;
import com.ssafy.ploud.domain.user.dto.SignUpReqDto;

public interface UserService {

  public void signUp(SignUpReqDto reqDto);

  public JwtAuthResponse login(LoginReqDto reqDto);

  public boolean isUserIdAvailable(String userId); // 아이디 중복 체크

  public boolean isNicknameAvailable(String nickname); // 닉네임 중복 체크

  public boolean isUserEmailAvailable(String userEmail); // 이메일 중복 체크

}
