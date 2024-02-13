package com.ssafy.ploud.domain.record.dto.response;

import com.ssafy.ploud.domain.speech.SpeechEntity;
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

  public static RecordDetailResponse of(SpeechEntity speech, VideoDetail videoDetail, List<FeedbackDetail> feedbackDetailList) {
    return RecordDetailResponse.builder()
        .speech(SpeechDetail.of(speech))
        .video(videoDetail)
        .score(speech.getScore().toDto())
        .feedbacks(feedbackDetailList)
        .build();
  }

}
