package com.ssafy.ploud.domain.user.service;

import com.ssafy.ploud.common.exception.UserNotFoundException;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.dto.JwtAuthResponse;
import com.ssafy.ploud.domain.user.dto.LoginReqDto;
import com.ssafy.ploud.domain.user.dto.NicknameUpdateReqDto;
import com.ssafy.ploud.domain.user.dto.SignUpReqDto;
import com.ssafy.ploud.domain.user.dto.UserInfoResDto;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import com.ssafy.ploud.jwt.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

  private UserRepository userRepository;
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  private AuthenticationManager authenticateManager;
  private JwtTokenProvider jwtTokenProvider;

  @Override
  public void signUp(SignUpReqDto reqDto) {
    UserEntity userEntity = UserEntity.createNewUser(reqDto, bCryptPasswordEncoder.encode(reqDto.getPassword()));
    userRepository.save(userEntity);
  }

  @Override
  public JwtAuthResponse login(LoginReqDto reqDto) {
    Authentication authentication = authenticateManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            reqDto.getUserId(),
            reqDto.getPassword()
        ));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    return jwtTokenProvider.generateToken(authentication);
  }

  @Override
  public boolean isUserIdAvailable(String userId) {
    return !userRepository.existsByUserId(userId);
  }

  @Override
  public boolean isNicknameAvailable(String nickname) {
    return !userRepository.existsByNickname(nickname);
  }

  @Override
  public boolean isUserEmailAvailable(String userEmail) {
    return !userRepository.existsByEmail(userEmail);
  }

  @Override
  public UserInfoResDto findUserByUserId(String userId) {

    UserEntity user = userRepository.findByUserId(userId);
    if (user == null) {
      throw new UserNotFoundException("User not found with userId: " + userId);
    }
    return UserInfoResDto.toDto(user);
  }

  public String updateUserNickname(NicknameUpdateReqDto reqDto) {
    UserEntity user = userRepository.findById(reqDto.getUserId())
        .orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));
    user.setNickname(reqDto.getNewNickname());
    return user.getNickname();
  }

}
