package com.ssafy.ploud.domain.script.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScriptDetailResDto {

  private String category;
  private String title;
  private String content;
  private String originalVideo;

}
