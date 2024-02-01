package com.ssafy.ploud.domain.record;

import com.ssafy.ploud.domain.speech.SpeechEntity;
import com.ssafy.ploud.domain.user.UserEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.sql.Time;
import lombok.Getter;

@Entity
@Getter
@Table(name = "feedbacks")
public class FeedbackEntity {

  @Id
  @GeneratedValue
  private int id; // 피드백 번호

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private UserEntity user; // 유저(피드백 받는 사람)

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "speech_id")
  private SpeechEntity speech; // 발표 번호

  private String content;

  private Time timeLog; // 영상에서의 시간

  public void setSpeech(SpeechEntity speech) {
    this.speech = speech;
  }

}
