package com.ssafy.ploud.domain.complain.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ComplainUserRequestDto {

  private String userNickname;
  private String content;

}
