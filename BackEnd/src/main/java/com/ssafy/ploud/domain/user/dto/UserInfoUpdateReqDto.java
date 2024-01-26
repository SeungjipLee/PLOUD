package com.ssafy.ploud.domain.user.dto;

import lombok.Data;

@Data
public class UserInfoUpdateReqDto {

  private String userId;
  private String newValue;

}
