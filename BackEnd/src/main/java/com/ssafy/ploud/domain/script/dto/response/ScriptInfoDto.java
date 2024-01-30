package com.ssafy.ploud.domain.script.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ScriptInfoDto {

  private int scriptId;
  private String scriptTitle;

}
