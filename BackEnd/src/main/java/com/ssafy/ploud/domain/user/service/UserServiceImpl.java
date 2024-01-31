package com.ssafy.ploud.domain.user.service;

import com.ssafy.ploud.common.exception.DuplicateException;
import com.ssafy.ploud.common.exception.UserNotFoundException;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.dto.FindIdResDto;
import com.ssafy.ploud.domain.user.dto.JwtAuthResponse;
import com.ssafy.ploud.domain.user.dto.LoginReqDto;
import com.ssafy.ploud.domain.user.dto.LoginResDto;
import com.ssafy.ploud.domain.user.dto.SignUpReqDto;
import com.ssafy.ploud.domain.user.dto.UserInfoResDto;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import com.ssafy.ploud.domain.user.security.JwtTokenProvider;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.imageio.ImageIO;
import javax.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
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
  private JwtTokenProvider jwtTokenProvider;
  private PasswordEncoder passwordEncoder;
  private final Map<String, String> emailVerificationCodes = new HashMap<>();

  @Override
  public void signUp(SignUpReqDto reqDto) {
    UserEntity userEntity = UserEntity.createNewUser(reqDto, bCryptPasswordEncoder.encode(reqDto.getPassword()));
    userRepository.save(userEntity);
  }

  @Override
  public LoginResDto login(LoginReqDto reqDto) {
    UserEntity user = userRepository.findById(reqDto.getUserId())
        .orElseThrow(() -> new UserNotFoundException("아이디를 다시 입력"));
    if (!passwordEncoder.matches(reqDto.getPassword(), user.getPassword())) {
      throw new UserNotFoundException("비밀번호를 다시 입력");
    }
    JwtAuthResponse res = jwtTokenProvider.generateToken(user.getUserId());
    user.setRefreshToken(res.getRefreshToken());
    return new LoginResDto(res.getRefreshToken(), res.getAccessToken(), "Bearer",
        user.getNickname());
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
  public boolean isUserEmailAvailable(String userEmail) throws MessagingException {
    if (!userRepository.existsByEmail(userEmail)) {
      String verificationCode = RandomStringUtils.randomAlphanumeric(6);
      EmailSenderService.sendEmailVerificationCode(userEmail, verificationCode);
      emailVerificationCodes.put(userEmail, verificationCode);
      return true;
    }
    return false;
  }

  public boolean verifyEmail(String userEmail, String verificationCode) {
    String storedVerificationCode = emailVerificationCodes.get(userEmail);
    boolean verified =
        storedVerificationCode != null && storedVerificationCode.equals(verificationCode);
    if (verified) {
      emailVerificationCodes.clear();
    }
    return verified;
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

  public String updateUserNickname(String userId, String newNickname) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));
    if (!isNicknameAvailable(newNickname)) {
      throw new DuplicateException();
    }
    user.updateUserNickname(newNickname);
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

  public void updateUserPassword(String userId, String newPassword) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new UserNotFoundException("유저를 찾을 수 없습니다"));
    user.updateUserPassword(bCryptPasswordEncoder.encode(newPassword));
  }

  @Transactional(readOnly = true)
  public FindIdResDto getUserIdByEmailAndName(String email, String name) {
    UserEntity user = userRepository.findByEmailAndName(email, name)
        .orElseThrow(() -> new UserNotFoundException("유저를 찾을 수 없습니다"));
    return new FindIdResDto(user.getUserId());
  }

  public void getUserPasswordByEmailAndId(String email, String userId) throws MessagingException {
    UserEntity user = userRepository.findByEmailAndUserId(email, userId)
        .orElseThrow(() -> new UserNotFoundException("유저를 찾을 수 없습니다"));
    String tempPassword = RandomStringUtils.randomAlphanumeric(10);    // generate temp password
    System.out.println("임시 비밀번호: " + tempPassword);
    EmailSenderService.sendResetPasswordMail(user.getEmail(), tempPassword); // send mail
    user.updateUserPassword(bCryptPasswordEncoder.encode(tempPassword));     // update users table
  }

  @Transactional(readOnly = true)
  public String getUserIdByEmail(String userEmail) {
    Optional<UserEntity> user = userRepository.findByEmail(userEmail);
    if (user.isEmpty()) {
      return null;
    } else {
      return user.get().getUserId();
    }
  }


}
