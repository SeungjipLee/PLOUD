package com.ssafy.ploud.domain.user.service;

import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.dto.SignUpReqDto;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public void signUp(SignUpReqDto reqDto) {
    UserEntity userEntity = UserEntity.createNewUser(reqDto, bCryptPasswordEncoder.encode(reqDto.getPassword()));
    userRepository.save(userEntity);
  }
}
