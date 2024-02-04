package com.ssafy.ploud.domain.board.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentRequest {

  private int id;
  private int boardId;
  private String userId;
  private String comment;
  
}
