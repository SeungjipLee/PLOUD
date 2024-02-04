package com.ssafy.ploud.domain.board.dto.response;

import com.ssafy.ploud.domain.board.BoardEntity;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class BoardResponse {

  private int id;
  private String userId;
  private String title;
  private String content;
  //private String videoPath;
  private LocalDateTime registerTime;

  public static BoardResponse fromEntity(BoardEntity boardEntity) {
    return BoardResponse.builder()
        .id(boardEntity.getId())
        .userId(boardEntity.getUserId())
        .title(boardEntity.getTitle())
        .content(boardEntity.getContent())
        //    .videoPath(boardEntity.getVideoPath())
        .registerTime(boardEntity.getRegisterTime())
        .build();
  }
}
