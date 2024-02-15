package com.ssafy.ploud.domain.user.dto.response;

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
