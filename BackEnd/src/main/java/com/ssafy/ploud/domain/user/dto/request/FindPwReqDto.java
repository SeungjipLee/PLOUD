package com.ssafy.ploud.domain.user.dto.request;

import lombok.Data;

@Data
public class FindPwReqDto {

  private String userId;
  private String email;

}
