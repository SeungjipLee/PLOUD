package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.board.BoardEntity;
import com.ssafy.ploud.domain.board.HeartEntity;
import com.ssafy.ploud.domain.board.dto.request.HeartRequest;
import com.ssafy.ploud.domain.board.repository.BoardRepository;
import com.ssafy.ploud.domain.board.repository.HeartRepository;
import jakarta.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HeartServiceImpl implements HeartService{

  private final HeartRepository heartRepository;
  private final BoardRepository boardRepository;

  @Override
  @Transactional
  public Map<String, Integer> updateHeart(HeartRequest heartRequest, String userId) {

    BoardEntity board = boardRepository.findById(heartRequest.getBoardId())
        .orElseThrow(() -> new CustomException(ResponseCode.BOARD_NOT_FOUND));
    System.out.println(board.getVideoPath());

    Optional<HeartEntity> heartEntityOptional = heartRepository.findByUserIdAndBoard(userId, board);

    if (!heartEntityOptional.isPresent()) {
      // heartEntity가 존재하지 않으면 새 heartEntity를 생성해서 저장
      HeartEntity heart = HeartEntity.builder()
          .userId(userId)
          .board(board)
          .build();

      heartRepository.save(heart);
      board.updateLikeCount(true);
    } else {
      HeartEntity heartEntity = heartEntityOptional.get();
      // heartEntity가 존재한다면 기존 heartEntity를 삭제
      heartRepository.delete(heartEntity);
      board.updateLikeCount(false);
    }

    Map<String, Integer> res = new HashMap<>();
    res.put("heartCount", board.getLikeCount());
    return res;
  }
}
