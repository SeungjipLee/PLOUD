package com.ssafy.ploud.domain.user.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdatePwReqDto {

  private String oldValue;
  private String newValue;

}
