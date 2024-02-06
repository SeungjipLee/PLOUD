package com.ssafy.ploud.domain.complain.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.complain.ComplainEntity;
import com.ssafy.ploud.domain.complain.dto.ComplainUserRequestDto;
import com.ssafy.ploud.domain.complain.repository.ComplainRepository;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ComplainServiceImpl implements ComplainService {

  private final UserRepository userRepository;
  private final ComplainRepository complainRepository;

  @Override
  public void complainUser(ComplainUserRequestDto requestDto) {

    UserEntity user = userRepository.findByNickname(requestDto.getUserNickname())
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

    complainRepository.save(ComplainEntity.of(requestDto, user));
  }

}
