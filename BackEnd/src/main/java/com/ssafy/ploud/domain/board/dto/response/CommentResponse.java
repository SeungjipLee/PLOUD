package com.ssafy.ploud.domain.board.dto.response;

import com.ssafy.ploud.domain.board.CommentEntity;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CommentResponse {

  private int id;
  private int boardId;
  private String userId;
  private String comment;
  private LocalDateTime registerTime;

  public static CommentResponse fromEntity(CommentEntity commentEntity) {
    return CommentResponse.builder()
        .id(commentEntity.getId())
        .boardId(commentEntity.getBoardId())
        .userId(commentEntity.getUserId())
        .comment(commentEntity.getComment())
        .registerTime(commentEntity.getRegisterTime())
        .build();
  }
}
