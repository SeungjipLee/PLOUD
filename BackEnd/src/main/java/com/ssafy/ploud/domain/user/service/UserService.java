package com.ssafy.ploud.domain.user.service;

import com.ssafy.ploud.domain.user.dto.LoginReqDto;
import com.ssafy.ploud.domain.user.dto.SignUpReqDto;

public interface UserService {

  public void signUp(SignUpReqDto reqDto);

  public String login(LoginReqDto reqDto);

}
