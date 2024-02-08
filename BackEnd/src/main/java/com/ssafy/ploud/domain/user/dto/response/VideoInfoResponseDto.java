package com.ssafy.ploud.domain.user.dto.response;

import com.ssafy.ploud.domain.speech.SpeechEntity;
import java.time.format.DateTimeFormatter;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class VideoInfoResponseDto {

  private int videoId;       // 영상 번호
  private String title;      // 발표 제목
  private String recordTime; // 영상 녹화 날짜
  private String playTime;      // 재생 시간

  public static VideoInfoResponseDto of(SpeechEntity speech) {
    return VideoInfoResponseDto.builder()
        .videoId(speech.getSpeechVideo().getId())
        .title(speech.getTitle())
        .recordTime(speech.getRecordTime().format(DateTimeFormatter.ofPattern("yyMMdd")))
        .playTime(convertToString(speech.getSpeechVideo().getPlayTime()))
        .build();
  }

  private static String convertToString(long totalSecs) {
    long minutes = (totalSecs % 3600) / 60;
    long seconds = totalSecs % 60;

    return String.format("%02d:%02d", minutes, seconds);
  }

}
