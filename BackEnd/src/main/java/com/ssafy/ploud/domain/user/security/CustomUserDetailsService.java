package com.ssafy.ploud.domain.user.security;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  // 들어온 id로 userEntity를 찾아서 User 객체를 반환
  // 컨트롤러에서 넘어온 id와 password값이 db에 저장된 비밀번호와 일치한지 검사

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String userId) throws CustomException {
    UserEntity loginUser = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

    return User.builder()
        .username(loginUser.getUserId())
        .password(loginUser.getPassword())
        .roles(String.valueOf(loginUser.getRole()))
        .build();
  }
}
