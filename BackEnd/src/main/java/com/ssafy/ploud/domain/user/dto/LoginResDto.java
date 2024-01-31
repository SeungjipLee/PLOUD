package com.ssafy.ploud.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResDto {

  private String refreshToken;
  private String accessToken;
  private String tokenType;
  private String nickname;

}
