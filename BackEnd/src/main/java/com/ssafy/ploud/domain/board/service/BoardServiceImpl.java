package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.domain.board.BoardEntity;
import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import com.ssafy.ploud.domain.board.repository.BoardRepository;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {

  private BoardRepository boardRepository;
  private UserRepository userRepository;

  @Override
  public void createBoard(BoardRequest boardRequest, String userId) {
    UserEntity userEntity = userRepository.findByUserId(userId)
        .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    BoardEntity boardEntity = BoardEntity.createBoard(boardRequest, userId);
    boardRepository.save(boardEntity);
  }

  @Override
  public BoardResponse getBoardById(int id) {
    BoardEntity boardEntity = boardRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
    return BoardResponse.fromEntity(boardEntity);
  }

  @Override
  public void updateBoard(int id, BoardRequest boardRequest) {
    BoardEntity boardEntity = boardRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
    BoardEntity.modifyBoard(boardRequest, boardEntity);
    boardRepository.save(boardEntity);
  }

  @Override
  public void deleteBoard(int id) {
    boardRepository.deleteById(id);
  }
}
