package com.ssafy.ploud.domain.user.security;

import com.ssafy.ploud.common.exception.UserNotFoundException;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  // 들어온 id로 userEntity를 찾아서 User 객체를 반환
  // 컨트롤러에서 넘어온 id와 password값이 db에 저장된 비밀번호와 일치한지 검사

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
    UserEntity loginUser = userRepository.findById(userId)
        .orElseThrow(() -> new UserNotFoundException("유저가 존재하지 않습니다"));

    return User.builder()
        .username(loginUser.getUserId())
        .password(loginUser.getPassword())
        .roles(String.valueOf(loginUser.getRole()))
        .build();
  }
}
