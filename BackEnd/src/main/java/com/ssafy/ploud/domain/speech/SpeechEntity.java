package com.ssafy.ploud.domain.speech;

import com.ssafy.ploud.domain.record.FeedbackEntity;
import com.ssafy.ploud.domain.record.ScoreEntity;
import com.ssafy.ploud.domain.record.VideoEntity;
import com.ssafy.ploud.domain.script.ScriptEntity;
import com.ssafy.ploud.domain.speech.dto.request.SpeechStartRequest;
import com.ssafy.ploud.domain.user.UserEntity;
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
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Table(name = "speeches")
public class SpeechEntity {

  @OneToMany(mappedBy = "speech")
  List<FeedbackEntity> feedbackEntityList = new ArrayList<>();
  @Id
  @GeneratedValue
  private int id; // 발표 번호
  @Setter
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
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "category_id")
  private CategoryEntity category; // 발표 카테고리

  private String title;

  private boolean personal; // 혼자 연습/스터디 연습

  private LocalDateTime recordTime; // 발표 시작 시간

  private String comment; // 개인 평가

  public static SpeechEntity createNewSpeech(SpeechStartRequest request, UserEntity user, CategoryEntity category, ScriptEntity script){
    SpeechEntity speechEntity = new SpeechEntity();
    speechEntity.title = request.getTitle();
    speechEntity.user = user;
    speechEntity.category = category;
    speechEntity.script = script;
    speechEntity.recordTime = LocalDateTime.now();
    return speechEntity;
  }

  public void updateComment(String comment){
    this.comment = comment;
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
