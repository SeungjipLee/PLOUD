package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.board.BoardEntity;
import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import com.ssafy.ploud.domain.board.repository.BoardRepository;
import com.ssafy.ploud.domain.board.repository.HeartRepository;
import com.ssafy.ploud.domain.record.VideoEntity;
import com.ssafy.ploud.domain.record.repository.VideoRepository;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardServiceImpl implements BoardService {

  private final BoardRepository boardRepository;
  private final VideoRepository videoRepository;
  private final UserRepository userRepository;
  private final HeartRepository heartRepository;

  @Override
  public Page<BoardResponse> getAllBoards(Pageable pageable) {

    Page<BoardEntity> boardEntities = boardRepository.findAll(pageable);

    return boardEntities.map(boardEntity -> BoardResponse.fromEntity(boardEntity, getNicknameAndProfileImg(
        boardEntity.getUserId()), false));
  }

  @Override
  public Page<BoardResponse> searchBoardsByTitle(String title, Pageable pageable) {

    Page<BoardEntity> boardEntities = boardRepository.findByTitleContainingIgnoreCase(title,
        pageable);

    return boardEntities.map(boardEntity -> BoardResponse.fromEntity(boardEntity, getNicknameAndProfileImg(
        boardEntity.getUserId()), false));
  }

  private Map<String, String> getNicknameAndProfileImg(String userId) {
    UserEntity user = userRepository.findByUserId(userId)
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));
    Map<String, String> res = new HashMap<>();
    res.put("nickname", user.getNickname());
    res.put("profileImg", user.getProfileImg());
    return res;
  }

  @Override
  @Transactional
  public void createBoard(BoardRequest boardRequest, String userId) {

    VideoEntity videoEntity = videoRepository.findById(boardRequest.getVideoId())
        .orElseThrow(() -> new CustomException(ResponseCode.VIDEO_NOT_FOUND));
    System.out.println(videoEntity.getVideoPath());
    BoardEntity boardEntity = BoardEntity.createBoard(boardRequest, userId,
        videoEntity.getVideoPath());

    boardRepository.save(boardEntity);
  }

  @Override
  public BoardResponse getBoardById(int id, String loginUser) {
    BoardEntity boardEntity = boardRepository.findById(id)
        .orElseThrow(() -> new CustomException(ResponseCode.BOARD_NOT_FOUND));

    UserEntity userEntity = userRepository.findNicknameByUserId(boardEntity.getUserId());

    return BoardResponse.fromEntity(boardEntity, getNicknameAndProfileImg(userEntity.getUserId()),
        heartRepository.findByUserIdAndBoardId(loginUser, boardEntity.getId())
            .isPresent());
  }

  @Override
  @Transactional
  public void updateBoard(int id, BoardRequest boardRequest, String userId) {

    VideoEntity videoEntity = videoRepository.findById(boardRequest.getVideoId())
        .orElseThrow(() -> new CustomException(ResponseCode.VIDEO_NOT_FOUND));
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

}
