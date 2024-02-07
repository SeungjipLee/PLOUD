package com.ssafy.ploud.domain.user.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.S3.service.S3Service;
import com.ssafy.ploud.domain.speech.SpeechEntity;
import com.ssafy.ploud.domain.speech.repository.SpeechRepository;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.dto.response.FindIdResDto;
import com.ssafy.ploud.domain.user.dto.response.JwtAuthResponse;
import com.ssafy.ploud.domain.user.dto.request.LoginReqDto;
import com.ssafy.ploud.domain.user.dto.response.LoginResDto;
import com.ssafy.ploud.domain.user.dto.request.SignUpReqDto;
import com.ssafy.ploud.domain.user.dto.response.UserInfoResDto;
import com.ssafy.ploud.domain.user.dto.response.VideoInfoResponseDto;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import com.ssafy.ploud.domain.user.security.JwtTokenProvider;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.imageio.ImageIO;
import javax.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.apache.commons.io.FilenameUtils;
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
  private SpeechRepository speechRepository;
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  private JwtTokenProvider jwtTokenProvider;
  private PasswordEncoder passwordEncoder;
  private S3Service s3Service;

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
    // 계정 잠금 확인
    checkAccountStatus(user);
    if (!passwordEncoder.matches(reqDto.getPassword(), user.getPassword())) {
      throw new CustomException(ResponseCode.USER_NOT_FOUND);
    }
    JwtAuthResponse res = jwtTokenProvider.generateToken(user.getUserId());
    user.setRefreshToken(res.getRefreshToken());
    return new LoginResDto(res.getRefreshToken(), res.getAccessToken(), "Bearer",
        user.getNickname());
  }

  private void checkAccountStatus(UserEntity user) {
    if(user.getRestrictDate() == null) return;
    if(LocalDateTime.now().isBefore(user.getRestrictDate())) {
      // 로그인 불가능
      throw new CustomException(ResponseCode.USER_ACCOUNT_LOCKED);
    } else {
      // 로그인 가능
      user.resetRestrictDate();
    }
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
  public String saveProfilePicture(MultipartFile file, String dirName, String userId) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

    String profileImgPath = s3Service.saveFile(file, "profile", userId);
    user.updateUserProfileImg(profileImgPath);

    return profileImgPath;
  }

  public void updateUserPassword(String userId, String oldPassword, String newPassword) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));
    // db에 저장된 비밀번호와 사용자가 입력한 현재 비밀번호 비교
    if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
      throw new CustomException(ResponseCode.INVALID_USER_PW);
    }
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

  @Transactional(readOnly = true)
  public List<VideoInfoResponseDto> getAllVideos(String userId) {
    List<SpeechEntity> entities = speechRepository.findAllByUser_userIdAndSpeechVideoIsNotNull(
        userId);
    List<VideoInfoResponseDto> videoList = new ArrayList<>();

    for(SpeechEntity entity : entities) {
      videoList.add(VideoInfoResponseDto.of(entity));
    }

    return videoList;
  }


}
