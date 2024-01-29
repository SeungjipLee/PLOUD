package com.ssafy.ploud.domain.user.dto;

import lombok.Data;

@Data
public class EmailVerifyReqDto {

  private String email;
  private String code;

}
