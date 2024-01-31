package com.ssafy.ploud.domain.speech;

import com.ssafy.ploud.domain.feedback.FeedbackEntity;
import com.ssafy.ploud.domain.record.ScoreEntity;
import com.ssafy.ploud.domain.script.ScriptEntity;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.video.VideoEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.Getter;

@Entity
@Getter
@Table(name = "speeches")
public class SpeechEntity {

  @OneToMany(mappedBy = "speech")
  List<FeedbackEntity> feedbackEntityList = new ArrayList<>();
  @Id
  @GeneratedValue
  private int id; // 발표 번호
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private UserEntity user; // 유저(발표자)
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "script_id")
  private ScriptEntity script; // 대본
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "score_id")
  private ScoreEntity score; // 발표에 대한 평가

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "video_id")
  private VideoEntity speechVideo;

  private SpeechCategory category; // 발표 카테고리

  private boolean personal; // 혼자 연습/스터디 연습

  private LocalDateTime recordTime; // 발표 시작 시간

  private String comment; // 개인 평가

  public static String[] getAllSpeechCategoryNames() {
    return Arrays.stream(SpeechCategory.values())
        .map(SpeechCategory::getCategoryName)
        .toArray(String[]::new);
  }

  public void setUser(UserEntity user) {
    this.user = user;
  }

  public void addFeedBack(FeedbackEntity feedback) {
    feedbackEntityList.add(feedback);
    feedback.setSpeech(this);
  }

  public void setVideo(VideoEntity video) {
    this.speechVideo = video;
    video.setSpeech(this);
  }

}
