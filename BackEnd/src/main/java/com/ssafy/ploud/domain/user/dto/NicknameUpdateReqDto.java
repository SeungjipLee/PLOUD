package com.ssafy.ploud.domain.user.dto;

import lombok.Data;

@Data
public class NicknameUpdateReqDto {

  private String userId;
  private String newNickname;

}
