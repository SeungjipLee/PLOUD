package com.ssafy.ploud.domain.user;

import com.ssafy.ploud.domain.user.dto.SignUpReqDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.Year;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Users")
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

  public static UserEntity createNewUser(SignUpReqDto reqDto, String encryptedPassword) {
    UserEntity newUser = new UserEntity();
    newUser.userId = reqDto.getUserId();
    newUser.name = reqDto.getName();
    newUser.nickname = reqDto.getNickname();
    newUser.password = encryptedPassword;
    newUser.email = reqDto.getEmail();
    newUser.birthYear = reqDto.getBirthYear();
    newUser.profileImg = "default profileImg path";
    newUser.refreshToken = null;
    newUser.complainCount = 0;
    newUser.restrictDate = null;
    newUser.joinDate = LocalDateTime.now();
    return newUser;
  }

  public void updateUserNickname(String nickname) {
    this.nickname = nickname;
  }

  public void updateUserProfileImg(String profileImg) {
    this.profileImg = profileImg;
  }

}
