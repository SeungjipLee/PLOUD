package com.ssafy.ploud.domain.record.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TotalScoreResponse {

//  String personalTime;
//  String studyTime;
  long totalTime;
  List<ScoreDetail> scoreChange;

  public static TotalScoreResponse createResponse(long totalTime, List<ScoreDetail> scoreChangeList) {
    return TotalScoreResponse.builder()
//        .personalTime(personalTime)
//        .studyTime(studyTime)
        .totalTime(totalTime)
        .scoreChange(scoreChangeList)
        .build();
  }

}
