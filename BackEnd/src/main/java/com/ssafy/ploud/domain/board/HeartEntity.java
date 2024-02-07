package com.ssafy.ploud.domain.board;

import static jakarta.persistence.FetchType.LAZY;

import com.ssafy.ploud.domain.user.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Builder
@Table(name = "hearts")
public class HeartEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "heart_id")
  private int id;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "user_id")
  private UserEntity user;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "board_id")
  private BoardEntity board;


  public HeartEntity(int id, UserEntity user, BoardEntity board) {
    this.id = id;
    this.user = user;
    this.board = board;
  }
}
