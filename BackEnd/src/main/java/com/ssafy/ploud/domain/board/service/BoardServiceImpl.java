package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.domain.board.BoardEntity;
import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import com.ssafy.ploud.domain.board.repository.BoardRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {

  private BoardRepository boardRepository;

  @Override
  public List<BoardResponse> getAllBoards() {
    List<BoardEntity> boardEntities = boardRepository.findAll();
    return boardEntities.stream()
        .map(BoardResponse::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public void createBoard(BoardRequest boardRequest, String userId) {
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

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String userId = authentication.getName();

    BoardEntity boardEntity = boardRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

    if (!boardEntity.getUserId().equals(userId)) {
      throw new AccessDeniedException("수정 권한이 없습니다.");
    }

    BoardEntity.updateBoard(boardRequest, boardEntity);
    boardRepository.save(boardEntity);
  }

  @Override
  public void deleteBoard(int id) {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String userId = authentication.getName();

    BoardEntity boardEntity = boardRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

    if (!boardEntity.getUserId().equals(userId)) {
      throw new AccessDeniedException("삭제 권한이 없습니다.");
    }

    boardRepository.deleteById(id);
  }
}
