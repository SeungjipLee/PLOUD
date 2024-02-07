package com.ssafy.ploud.domain.user.service;

import com.ssafy.ploud.domain.user.dto.response.FindIdResDto;
import com.ssafy.ploud.domain.user.dto.request.LoginReqDto;
import com.ssafy.ploud.domain.user.dto.response.LoginResDto;
import com.ssafy.ploud.domain.user.dto.request.SignUpReqDto;
import com.ssafy.ploud.domain.user.dto.response.UserInfoResDto;
import com.ssafy.ploud.domain.user.dto.response.VideoInfoResponseDto;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

  public void signUp(SignUpReqDto reqDto);

  public LoginResDto login(LoginReqDto reqDto);

  public void isUserIdAvailable(String userId); // 아이디 중복 체크

  public void verifyEmail(String userEmail, String verificationCode); // 이메일 인증코드 검증

  public void isNicknameAvailable(String nickname); // 닉네임 중복 체크

  public void isUserEmailAvailable(String userEmail); // 이메일 중복 체크

  public UserInfoResDto findUserByUserId(String userId); // 회원 정보 조회

  public String updateUserNickname(String userId, String newNickname); // 회원 닉네임 수정

  public String saveProfilePicture(MultipartFile file, String userId); // 프로필 사진 등록

  public void updateUserPassword(String userId, String oldPassword, String newPassword); // 회원 비밀번호 수정

  public FindIdResDto getUserIdByEmailAndName(String email, String name); // 회원 아이디 찾기

  public void getUserPasswordByEmailAndId(String email, String userId); // 회원 비밀번호 찾기

  public String getUserIdByEmail(String userEmail); // 이메일로 사용자 아이디 찾기

  public List<VideoInfoResponseDto> getAllVideos(String userId); // 사용자의 모든 영상 조회



}
