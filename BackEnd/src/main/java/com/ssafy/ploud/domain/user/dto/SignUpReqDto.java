package com.ssafy.ploud.domain.user.dto;

import java.time.Year;
import lombok.Data;

@Data
public class SignUpReqDto {

  private String userId;
  private String password;
  private String email;
  private String name;
  private String nickname;
  private Year birthYear;

}
