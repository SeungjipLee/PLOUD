package com.ssafy.ploud.domain.board;

import com.ssafy.ploud.domain.board.dto.request.CommentRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "comments")
public class CommentEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "comment_id")
  private int id; // 댓글 번호

  private int boardId;  // 게시글 번호

  private String userId;  // 댓글 작성자

  private String comment; // 댓글 내용

  private LocalDateTime registerTime; // 댓글 작성 시각

  public static CommentEntity createComment(CommentRequest commentRequest, String userId) {
    CommentEntity commentEntity = new CommentEntity();

    commentEntity.boardId = commentRequest.getBoardId();
    commentEntity.userId = userId;
    commentEntity.comment = commentRequest.getComment();
    commentEntity.registerTime = LocalDateTime.now();

    return commentEntity;
  }
}
