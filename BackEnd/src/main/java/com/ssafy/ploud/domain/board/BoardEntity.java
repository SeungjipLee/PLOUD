package com.ssafy.ploud.domain.board;

import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import com.ssafy.ploud.domain.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.apache.catalina.User;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

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

    public static BoardEntity createBoard(BoardRequest boardRequest, String userId) {
        BoardEntity boardEntity = new BoardEntity();

        boardEntity.userId = userId;
        boardEntity.title = boardRequest.getTitle();
        boardEntity.content = boardRequest.getContent();
        boardEntity.videoPath = boardRequest.getVideoPath().getOriginalFilename();
        boardEntity.registerTime = LocalDateTime.now();

        return boardEntity;
    }


}