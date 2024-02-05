package com.ssafy.ploud.domain.record;

import com.ssafy.ploud.domain.record.dto.response.FeedbackDetail;
import com.ssafy.ploud.domain.speech.SpeechEntity;
import com.ssafy.ploud.domain.speech.dto.request.FeedbackRequest;
import com.ssafy.ploud.domain.user.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.sql.Time;
import java.time.Duration;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "feedbacks")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "feedback_id")
  private int id; // 피드백 번호

//  @ManyToOne(fetch = FetchType.LAZY)
//  @JoinColumn(name = "user_id")
//  private UserEntity user; // 유저(피드백 받는 사람)
  private String userId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "speech_id")
  private SpeechEntity speech; // 발표 번호

  private String content;

  private Duration timeLog; // 영상에서의 시간

  public static FeedbackEntity of(FeedbackRequest feedbackRequest, SpeechEntity speech) {
    return FeedbackEntity.builder()
        .userId(feedbackRequest.getUserId())
        .content(feedbackRequest.getContent())
        .timeLog(Duration.between(speech.getRecordTime(), LocalDateTime.now()))
        .speech(speech)
        .build();
  }

  public void setSpeech(SpeechEntity speech) {
    this.speech = speech;
  }

  public FeedbackDetail toDto() {
    return new FeedbackDetail(content, timeLog);
  }

}
