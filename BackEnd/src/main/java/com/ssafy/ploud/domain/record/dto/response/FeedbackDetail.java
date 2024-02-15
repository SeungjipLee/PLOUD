package com.ssafy.ploud.domain.record.dto.response;

import com.ssafy.ploud.domain.record.FeedbackEntity;
import java.sql.Time;
import java.time.Duration;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
public class FeedbackDetail {

  String content;
  String timeLog; // 피드백 작성 시간(분:초)

  public static FeedbackDetail of(FeedbackEntity feedback) {
    return FeedbackDetail.builder()
        .content(feedback.getContent())
        .timeLog(convertToString(feedback.getTimeLog().getSeconds()))
        .build();
  }

  private static String convertToString(long totalSecs) {
    long minutes = (totalSecs % 3600) / 60;
    long seconds = totalSecs % 60;

    return String.format("%02d:%02d", minutes, seconds);
  }

}