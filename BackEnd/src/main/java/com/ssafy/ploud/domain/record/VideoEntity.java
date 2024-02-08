package com.ssafy.ploud.domain.record;

import com.ssafy.ploud.domain.record.dto.response.VideoDetail;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "videos")
public class VideoEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "video_id")
  private int id;

  private String videoPath;

  private long playTime; // 영상 재생 시간(분)

  public VideoDetail toDto() {
    return new VideoDetail(videoPath, playTime);
  }

  public static VideoEntity createEntity(String videoPath, long playTimeInSeconds) {
    return VideoEntity.builder()
        .videoPath(videoPath)
        .playTime(playTimeInSeconds)
        .build();
  }

}

