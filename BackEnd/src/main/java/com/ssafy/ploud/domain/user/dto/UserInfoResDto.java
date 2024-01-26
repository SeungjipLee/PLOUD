package com.ssafy.ploud.domain.user.dto;

import com.ssafy.ploud.domain.user.UserEntity;
import java.time.Year;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoResDto {

  private String userId;
  private String email;
  private String profileImg;
  private String name;
  private String nickname;
  private Year year;

  public static UserInfoResDto toDto(UserEntity entity) {
    return UserInfoResDto.builder()
        .userId(entity.getUserId())
        .email(entity.getEmail())
        .profileImg(entity.getProfileImg())
        .name(entity.getName())
        .nickname(entity.getNickname())
        .year(entity.getBirthYear())
        .build();
  }

}
