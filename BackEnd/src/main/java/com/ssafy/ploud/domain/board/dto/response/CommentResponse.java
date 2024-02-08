package com.ssafy.ploud.domain.board.dto.response;

import com.ssafy.ploud.domain.board.CommentEntity;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CommentResponse {

  private int id;
  private int boardId;
  private String nickname;
  private String comment;
  private String registerTime;

  public static CommentResponse fromEntity(CommentEntity commentEntity, String nickname) {
    return CommentResponse.builder()
        .id(commentEntity.getId())
        .boardId(commentEntity.getBoardId())
        .nickname(nickname)
        .comment(commentEntity.getComment())
        .registerTime(commentEntity.getRegisterTime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm")))
        .build();
  }
}
