package com.ssafy.ploud.domain.complain;

import com.ssafy.ploud.domain.complain.dto.ComplainUserRequestDto;
import com.ssafy.ploud.domain.user.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "complains")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ComplainEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "complain_id")
  private int id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserEntity user;

  private String content;

  private LocalDateTime complainTime;

  private boolean restriction;

  public static ComplainEntity of(ComplainUserRequestDto reqDto, UserEntity user) {
    return ComplainEntity.builder()
        .user(user)
        .content(reqDto.getContent())
        .complainTime(LocalDateTime.now())
        .build();
  }


}
