package com.ssafy.ploud.domain.user.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
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

  private final Map<String, String> emailVerificationCodes = new HashMap<>();
  private UserRepository userRepository;
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  private JwtTokenProvider jwtTokenProvider;
  private PasswordEncoder passwordEncoder;

  @Override
  public void signUp(SignUpReqDto reqDto) {
    UserEntity userEntity = UserEntity.createNewUser(reqDto,
        bCryptPasswordEncoder.encode(reqDto.getPassword()));
    userRepository.save(userEntity);
  }

  @Override
  public LoginResDto login(LoginReqDto reqDto) {
    UserEntity user = userRepository.findById(reqDto.getUserId())
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));
    if (!passwordEncoder.matches(reqDto.getPassword(), user.getPassword())) {
      throw new CustomException(ResponseCode.USER_NOT_FOUND);
    }
    JwtAuthResponse res = jwtTokenProvider.generateToken(user.getUserId());
    user.setRefreshToken(res.getRefreshToken());
    return new LoginResDto(res.getRefreshToken(), res.getAccessToken(), "Bearer",
        user.getNickname());
  }

  @Transactional(readOnly = true)
  @Override
  public void isUserIdAvailable(String userId) {
    if (userRepository.existsByUserId(userId)) {
      throw new CustomException(ResponseCode.USER_ID_DUPLICATED);
    }
  }

  @Transactional(readOnly = true)
  @Override
  public void isNicknameAvailable(String nickname) {
    if (userRepository.existsByNickname(nickname)) { // 닉네임이 이미 존재함
      throw new CustomException(ResponseCode.USER_NICKNAME_DUPLICATED);
    }
  }

  @Transactional(readOnly = true)
  @Override
  public void isUserEmailAvailable(String userEmail) {
    if (userRepository.existsByEmail(userEmail)) {
      throw new CustomException(ResponseCode.USER_EMAIL_DUPLICATED);
    }
    try {
      String verificationCode = RandomStringUtils.randomAlphanumeric(6);
      EmailSenderService.sendEmailVerificationCode(userEmail, verificationCode);
      emailVerificationCodes.put(userEmail, verificationCode);
    } catch (MessagingException e) {
      throw new CustomException(ResponseCode.MAIL_SEND_ERROR);
    }
  }

  public void verifyEmail(String userEmail, String verificationCode) {
    String storedVerificationCode = emailVerificationCodes.get(userEmail);
    if (storedVerificationCode != null && storedVerificationCode.equals(verificationCode)) {
      emailVerificationCodes.clear();
      return;
    }
    throw new CustomException(ResponseCode.CODE_INVALID_VALUE);
  }

  @Transactional(readOnly = true)
  @Override
  public UserInfoResDto findUserByUserId(String userId) {
    UserEntity user = userRepository.findByUserId(userId)
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));
    return UserInfoResDto.toDto(user);
  }

  public String updateUserNickname(String userId, String newNickname) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));
    isNicknameAvailable(newNickname);
    user.updateUserNickname(newNickname);
    return user.getNickname();
  }

  @Override
  public byte[] saveProfilePicture(MultipartFile file, String userId) {

    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

    try {
      // TODO: imagePath 배포 환경에 맞게 변경
      String extension = StringUtils.getFilenameExtension(
          file.getOriginalFilename());
      String imagePath =
          "C://ploud_img/profile_image_" + userId + "." + extension;

      file.transferTo(new File(imagePath));

      user.updateUserProfileImg(imagePath);

      return readImage(imagePath, extension);
    } catch (IOException e) {
      throw new CustomException(ResponseCode.BAD_REQUEST);
    }
  }

  public byte[] readImage(String imagePath, String extension) throws IOException {
    BufferedImage bImage = ImageIO.read(new File(imagePath));
    ByteArrayOutputStream bos = new ByteArrayOutputStream();
    ImageIO.write(bImage, extension, bos);

    return bos.toByteArray();
  }

  public void updateUserPassword(String userId, String newPassword) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));
    user.updateUserPassword(bCryptPasswordEncoder.encode(newPassword));
  }

  @Transactional(readOnly = true)
  public FindIdResDto getUserIdByEmailAndName(String email, String name) {
    UserEntity user = userRepository.findByEmailAndName(email, name)
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));
    return new FindIdResDto(user.getUserId());
  }

  public void getUserPasswordByEmailAndId(String email, String userId) {
    UserEntity user = userRepository.findByEmailAndUserId(email, userId)
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));
    try {
      String tempPassword = RandomStringUtils.randomAlphanumeric(10);    // generate temp password
      System.out.println("임시 비밀번호: " + tempPassword);
      EmailSenderService.sendResetPasswordMail(user.getEmail(), tempPassword); // send mail
      user.updateUserPassword(bCryptPasswordEncoder.encode(tempPassword));     // update users table
    } catch (MessagingException e) {
      throw new CustomException(ResponseCode.MAIL_SEND_ERROR);
    }
  }

  @Transactional(readOnly = true)
  public String getUserIdByEmail(String userEmail) {
    UserEntity user = userRepository.findByEmail(userEmail)
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));
    return user.getUserId();
  }


}
