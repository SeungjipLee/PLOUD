package com.ssafy.ploud.domain.user.dto;

import lombok.Data;

@Data
public class FindPwReqDto {

  private String userId;
  private String email;

}
