package com.ssafy.ploud.domain.record.dto.response;

import java.util.List;
import lombok.Data;

@Data
public class TotalScoreResponse {

  // String personalTime;
  // String studyTime;
  List<ScoreDetail> scoreChange;

}
