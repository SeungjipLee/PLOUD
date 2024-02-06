package com.ssafy.ploud.domain.complain.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.complain.ComplainEntity;
import com.ssafy.ploud.domain.complain.dto.ComplainResponse;
import com.ssafy.ploud.domain.complain.dto.ComplainUserRequestDto;
import com.ssafy.ploud.domain.complain.repository.ComplainRepository;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ComplainServiceImpl implements ComplainService {

  private final UserRepository userRepository;
  private final ComplainRepository complainRepository;

  @Override
  @Transactional
  public void complainUser(ComplainUserRequestDto requestDto) {

    UserEntity user = userRepository.findByNickname(requestDto.getUserNickname())
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

    // 사용자 누적 신고 횟수 업데이트
    user.updateComplainCount();
    complainRepository.save(ComplainEntity.of(requestDto, user));
  }

  @Override
  public List<ComplainResponse> findAll() {
    List<ComplainEntity> entityList = complainRepository.findAll();
    List<ComplainResponse> complainResponses = new ArrayList<>();

    for(ComplainEntity entity:entityList) {
      complainResponses.add(ComplainResponse.of(entity));
    }
    return complainResponses;
  }
}
