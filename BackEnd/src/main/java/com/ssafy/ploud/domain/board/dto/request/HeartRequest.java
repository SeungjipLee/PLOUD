package com.ssafy.ploud.domain.board.dto.request;

import lombok.Getter;

@Getter
public class HeartRequest {
  private String userId;
  private int boardId;

  public HeartRequest (String userid, int boardId){
    this.userId = userid;
    this.boardId = boardId;
  }
}
