package com.ssafy.ploud.domain.record;

import com.ssafy.ploud.domain.record.dto.response.VideoDetail;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Getter
@Table(name = "videos")
public class VideoEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "video_id")
  private int id;

  //  @OneToOne(fetch = FetchType.LAZY)
  //  @JoinColumn(name = "speech_id")
  //  private SpeechEntity speechVideo;

//  @OneToOne(fetch = FetchType.LAZY, mappedBy = "speechVideo")
//  private SpeechEntity speech;

  private String videoPath;

  private int playTime; // 영상 재생 시간(분)

//  public void setSpeech(SpeechEntity speech) {
//    this.speech = speech;
//  }

  public VideoDetail toDto() {
    return new VideoDetail(videoPath, playTime);
  }

}

