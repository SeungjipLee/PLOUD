package com.ssafy.ploud.domain.record.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RecordDetailResponse {

  SpeechDetail speech;
  VideoDetail video;
  ScoreDetail score;
  List<FeedbackDetail> feedbacks;

}
