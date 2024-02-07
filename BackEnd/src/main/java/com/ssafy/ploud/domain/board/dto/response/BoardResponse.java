package com.ssafy.ploud.domain.board.dto.response;

import com.ssafy.ploud.domain.board.BoardEntity;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class BoardResponse {

  private int id;
  private String nickname;
  private String title;
  private String content;
  //private String videoPath;
  private LocalDateTime registerTime;
  private int likeCount;

  public static BoardResponse fromEntity(BoardEntity boardEntity) {
    return BoardResponse.builder()
        .id(boardEntity.getId())
        .nickname(boardEntity.getNickname())
        .title(boardEntity.getTitle())
        .content(boardEntity.getContent())
        //    .videoPath(boardEntity.getVideoPath())
        .registerTime(boardEntity.getRegisterTime())
        .likeCount(boardEntity.getLikeCount())
        .build();
  }


}
