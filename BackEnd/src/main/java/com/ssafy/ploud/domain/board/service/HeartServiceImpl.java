package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.board.BoardEntity;
import com.ssafy.ploud.domain.board.HeartEntity;
import com.ssafy.ploud.domain.board.dto.request.HeartRequest;
import com.ssafy.ploud.domain.board.repository.BoardRepository;
import com.ssafy.ploud.domain.board.repository.HeartRepository;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import java.util.Optional;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

@Service
@RequiredArgsConstructor
public class HeartServiceImpl implements HeartService{

  private final HeartRepository heartRepository;
  private final UserRepository userRepository;
  private final BoardRepository boardRepository;
  @Override
  public void insert(HeartRequest heartRequest, String userId) {

    BoardEntity board = boardRepository.findById(heartRequest.getBoardId())
        .orElseThrow(() -> new CustomException(ResponseCode.BOARD_NOT_FOUND));

    if(heartRepository.findByUser_UserIdAndBoard(userId, board).isPresent()){
      throw new CustomException(ResponseCode.ALREADY_PRESS);
    }

    HeartEntity heartEntity = HeartEntity.builder()
        .userId(userId)
        .board(board)
        .build();

    heartRepository.save(heartEntity);
  }

  @Override
  public void delete(HeartRequest heartRequest, String userId) {

    BoardEntity board = boardRepository.findById(heartRequest.getBoardId())
        .orElseThrow(() -> new CustomException(ResponseCode.BOARD_NOT_FOUND));

    HeartEntity heart = (HeartEntity) heartRepository.findByUser_UserIdAndBoard(userId, board)
        .orElseThrow(()->  new CustomException(ResponseCode.HEART_NOT_FOUND));

    heartRepository.delete(heart);
  }
}
