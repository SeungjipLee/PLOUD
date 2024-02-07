package com.ssafy.ploud.domain.board.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BoardRequest {

  private String title;
  private String content;

  // private MultipartFile videoPath;

}
