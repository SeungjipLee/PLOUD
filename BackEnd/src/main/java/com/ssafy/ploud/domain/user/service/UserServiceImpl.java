package com.ssafy.ploud.domain.user.service;

import com.ssafy.ploud.common.exception.UserNotFoundException;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.dto.JwtAuthResponse;
import com.ssafy.ploud.domain.user.dto.LoginReqDto;
import com.ssafy.ploud.domain.user.dto.SignUpReqDto;
import com.ssafy.ploud.domain.user.dto.UserInfoResDto;
import com.ssafy.ploud.domain.user.dto.UserInfoUpdateReqDto;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import com.ssafy.ploud.domain.user.security.JwtTokenProvider;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

  private UserRepository userRepository;
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  private AuthenticationManager authenticateManager;
  private JwtTokenProvider jwtTokenProvider;
  private PasswordEncoder passwordEncoder;

  @Override
  public void signUp(SignUpReqDto reqDto) {
    UserEntity userEntity = UserEntity.createNewUser(reqDto, bCryptPasswordEncoder.encode(reqDto.getPassword()));
    userRepository.save(userEntity);
  }

  @Override
  public JwtAuthResponse login(LoginReqDto reqDto) {
    UserEntity user = userRepository.findById(reqDto.getUserId())
        .orElseThrow(() -> new UserNotFoundException("아이디를 다시 입력"));
    if (!passwordEncoder.matches(reqDto.getPassword(), user.getPassword())) {
      throw new UserNotFoundException("비밀번호를 다시 입력");
    }
    JwtAuthResponse res = jwtTokenProvider.generateToken(user.getUserId());
    user.setRefreshToken(res.getRefreshToken());
    return res;
  }

  @Transactional(readOnly = true)
  @Override
  public boolean isUserIdAvailable(String userId) {
    return !userRepository.existsByUserId(userId);
  }

  @Transactional(readOnly = true)
  @Override
  public boolean isNicknameAvailable(String nickname) {
    return !userRepository.existsByNickname(nickname);
  }

  @Transactional(readOnly = true)
  @Override
  public boolean isUserEmailAvailable(String userEmail) {
    return !userRepository.existsByEmail(userEmail);
  }

  @Transactional(readOnly = true)
  @Override
  public UserInfoResDto findUserByUserId(String userId) {

    UserEntity user = userRepository.findByUserId(userId);
    if (user == null) {
      throw new UserNotFoundException("User not found with userId: " + userId);
    }
    return UserInfoResDto.toDto(user);
  }

  public String updateUserNickname(UserInfoUpdateReqDto reqDto) {
    UserEntity user = userRepository.findById(reqDto.getUserId())
        .orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));
    user.updateUserNickname(reqDto.getNewValue());
    return user.getNickname();
  }

  @Override
  public byte[] saveProfilePicture(MultipartFile file, String userId) throws IOException {

    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));

    // TODO: imagePath 배포 환경에 맞게 변경
    String extension = StringUtils.getFilenameExtension(
        file.getOriginalFilename());
    String imagePath =
        "C://ploud_img/profile_image_" + userId + "." + extension;

    file.transferTo(new File(imagePath));

    user.updateUserProfileImg(imagePath);

    return readImage(imagePath, extension);
  }

  public byte[] readImage(String imagePath, String extension) throws IOException {
    BufferedImage bImage = ImageIO.read(new File(imagePath));
    ByteArrayOutputStream bos = new ByteArrayOutputStream();
    ImageIO.write(bImage, extension, bos);

    return bos.toByteArray();
  }
}
