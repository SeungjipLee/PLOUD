package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.board.BoardEntity;
import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import com.ssafy.ploud.domain.board.repository.BoardRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.awt.print.Pageable;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {

  private BoardRepository boardRepository;
  private EntityManager entityManager;

  @Override
  public List<BoardResponse> getAllBoards(Pageable pageable) {
    List<BoardEntity> boardEntities = boardRepository.findAll();
    return boardEntities.stream()
        .map(BoardResponse::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public void createBoard(BoardRequest boardRequest, String userId, String nickname) {
    BoardEntity boardEntity = BoardEntity.createBoard(boardRequest, userId, nickname);
    boardRepository.save(boardEntity);
  }

  @Override
  public BoardResponse getBoardById(int id) {
    BoardEntity boardEntity = boardRepository.findById(id)
        .orElseThrow(() -> new CustomException(ResponseCode.BOARD_NOT_FOUND));
    return BoardResponse.fromEntity(boardEntity);
  }

  @Override
  public void updateBoard(int id, BoardRequest boardRequest) {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String userId = authentication.getName();

    BoardEntity boardEntity = boardRepository.findById(id)
        .orElseThrow(() -> new CustomException(ResponseCode.BOARD_NOT_FOUND));

    if (!boardEntity.getUserId().equals(userId)) {
      throw new CustomException(ResponseCode.NO_PERMISSION);
    }

    BoardEntity.updateBoard(boardRequest, boardEntity);
    boardRepository.save(boardEntity);
  }

  @Override
  public void deleteBoard(int id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String userId = authentication.getName();

    BoardEntity boardEntity = boardRepository.findById(id)
        .orElseThrow(() -> new CustomException(ResponseCode.BOARD_NOT_FOUND));

    if (!boardEntity.getUserId().equals(userId)) {
      throw new CustomException(ResponseCode.NO_PERMISSION);
    }

    boardRepository.deleteById(id);
  }

  @Override
  public void updateCount(BoardResponse board, boolean heart) {
    if (heart) {
      board.setLikeCount(board.getLikeCount() + 1);
    } else {
      board.setLikeCount(board.getLikeCount() - 1);
    }

    entityManager.merge(board);
  }


}
