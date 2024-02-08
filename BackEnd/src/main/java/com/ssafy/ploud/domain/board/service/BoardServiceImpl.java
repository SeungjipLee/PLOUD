package com.ssafy.ploud.domain.board.service;

import static com.ssafy.ploud.domain.board.QBoardEntity.boardEntity;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.board.BoardEntity;
import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import com.ssafy.ploud.domain.board.repository.BoardRepository;
import com.ssafy.ploud.domain.record.VideoEntity;
import com.ssafy.ploud.domain.record.repository.VideoRepository;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardServiceImpl implements BoardService {

  private final BoardRepository boardRepository;
  private final EntityManager entityManager;
  private final VideoRepository videoRepository;
  private final UserRepository userRepository;

  @Override
  public Page<BoardResponse> getAllBoards(Pageable pageable) {

    Page<BoardEntity> boardEntities = boardRepository.findAll(pageable);

    return boardEntities.map(boardEntity -> BoardResponse.fromEntity(boardEntity, getNickname(
        boardEntity.getUserId())));
  }

  private String getNickname(String userId) {
    return userRepository.findNicknameByUserId(userId).getNickname();

  }

  @Override
  @Transactional
  public void createBoard(BoardRequest boardRequest, String userId) {

    VideoEntity videoEntity = videoRepository.findById(boardRequest.getVideoId())
        .orElseThrow(()-> new CustomException(ResponseCode.VIDEO_NOT_FOUND));
    BoardEntity boardEntity = BoardEntity.createBoard(boardRequest, userId, videoEntity.getVideoPath());

    boardRepository.save(boardEntity);
  }

  @Override
  public BoardResponse getBoardById(int id) {
    BoardEntity boardEntity = boardRepository.findById(id)
        .orElseThrow(() -> new CustomException(ResponseCode.BOARD_NOT_FOUND));

    boardEntity.getUserId();

    UserEntity userEntity = userRepository.findNicknameByUserId(boardEntity.getUserId());

    return BoardResponse.fromEntity(boardEntity, userEntity.getNickname());
  }

  @Override
  @Transactional
  public void updateBoard(int id, BoardRequest boardRequest, String userId) {

    VideoEntity videoEntity = videoRepository.findById(boardRequest.getVideoId())
        .orElseThrow(()-> new CustomException(ResponseCode.VIDEO_NOT_FOUND));
    BoardEntity boardEntity = boardRepository.findById(id)
        .orElseThrow(() -> new CustomException(ResponseCode.BOARD_NOT_FOUND));

    if (!boardEntity.getUserId().equals(userId)) {
      throw new CustomException(ResponseCode.NO_PERMISSION);
    }

    BoardEntity.updateBoard(boardRequest, boardEntity, videoEntity.getVideoPath());
  }

  @Override
  @Transactional
  public void deleteBoard(int id, String userId) {

    BoardEntity boardEntity = boardRepository.findById(id)
        .orElseThrow(() -> new CustomException(ResponseCode.BOARD_NOT_FOUND));

    if (!boardEntity.getUserId().equals(userId)) {
      throw new CustomException(ResponseCode.NO_PERMISSION);
    }

    boardRepository.deleteById(id);
  }

  @Override
  @Transactional
  public void updateCount(BoardResponse board, boolean heart) {
    if (heart) {
      board.setLikeCount(board.getLikeCount() + 1);
    } else {
      board.setLikeCount(board.getLikeCount() - 1);
    }

    entityManager.merge(board);
  }
}
