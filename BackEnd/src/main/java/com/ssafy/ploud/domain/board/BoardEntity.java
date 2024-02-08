package com.ssafy.ploud.domain.board;

import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
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
@Table(name = "boards")
public class BoardEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "board_id")
  private int id; // 게시글 번호

  private String userId; // 작성자

  private String title;   // 게시글 제목

  private String content; // 게시글 내용

  private String videoPath;

  private LocalDateTime registerTime; // 게시글 작성 시각

  private int likeCount;  // 좋아요 개수

  public static BoardEntity createBoard(BoardRequest boardRequest, String userId, String videoPath) {
    BoardEntity boardEntity = new BoardEntity();

    boardEntity.userId = userId;
    boardEntity.title = boardRequest.getTitle();
    boardEntity.content = boardRequest.getContent();
    boardEntity.videoPath = videoPath;
    boardEntity.registerTime = LocalDateTime.now();

    return boardEntity;
  }

  public static void updateBoard(BoardRequest boardRequest, BoardEntity boardEntity, String videoPath) {
    boardEntity.setTitle(boardRequest.getTitle());
    boardEntity.setContent(boardRequest.getContent());
    boardEntity.setVideoPath(videoPath);
    boardEntity.setRegisterTime(LocalDateTime.now());   // 수정 시각으로 업데이트
  }
}