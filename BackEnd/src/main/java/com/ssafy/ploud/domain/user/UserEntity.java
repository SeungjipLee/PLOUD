package com.ssafy.ploud.domain.user;

import com.ssafy.ploud.domain.speech.SpeechEntity;
import com.ssafy.ploud.domain.user.dto.SignUpReqDto;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class UserEntity {

  @Id
  @NotNull
  private String userId;
  @NotNull
  private String name;
  @NotNull
  private String nickname;
  @NotNull
  private String password;
  @NotNull
  private String email;
  @NotNull
  private Year birthYear;
  @NotNull
  private String profileImg;
  @NotNull
  private String refreshToken;
  private int complainCount;
  private LocalDateTime restrictDate;
  @NotNull
  private LocalDateTime joinDate;

  private long soloDurationInMinute;
  private long studyDurationInMinute;

  @Enumerated(EnumType.STRING)
  private Role role;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  List<SpeechEntity> speechEntityList = new ArrayList<>();

  public static UserEntity createNewUser(SignUpReqDto reqDto, String encryptedPassword) {
    UserEntity newUser = new UserEntity();
    newUser.userId = reqDto.getUserId();
    newUser.name = reqDto.getName();
    newUser.nickname = reqDto.getNickname();
    newUser.password = encryptedPassword;
    newUser.email = reqDto.getEmail();
    newUser.birthYear = reqDto.getBirthYear();
    newUser.profileImg = null;
    newUser.refreshToken = null;
    newUser.complainCount = 0;
    newUser.restrictDate = null;
    newUser.joinDate = LocalDateTime.now();
    newUser.role = Role.USER;
    newUser.soloDurationInMinute = 0;
    newUser.studyDurationInMinute = 0;
    return newUser;
  }

  public void updateUserNickname(String nickname) {
    this.nickname = nickname;
  }

  public void updateUserProfileImg(String profileImg) {
    this.profileImg = profileImg;
  }

  public void updateUserPassword(String password) {
    this.password = password;
  }

  public void updateSoloDuration(long practiceTimeInMinute) {
    this.soloDurationInMinute += practiceTimeInMinute;
  }

  public void updateStudyDuration(long practiceTimeinMinute) {
    this.studyDurationInMinute += practiceTimeinMinute;
  }

}
