package com.ssafy.ploud.domain.record.dto.response;

import com.ssafy.ploud.domain.script.ScriptCategory;
import com.ssafy.ploud.domain.speech.SpeechCategory;
import com.ssafy.ploud.domain.speech.SpeechEntity;
import java.time.format.DateTimeFormatter;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
public class SpeechDetail {

  String title;
  String category; // 발표 또는 대본 카테고리
  int speechId;
  String userId;
  String speechMode;
  String startsAt; // ??? string?
  String comment;

  public static SpeechDetail of(SpeechEntity speech) {
    String mode = null;
    String categoryName = null;

    if(speech.isPersonal()) {
      mode = "연습 모드";
      categoryName = ScriptCategory.fromCategoryId(speech.getCategoryId()).getCategoryName();
    } else {
      mode = "스터디";
      categoryName = SpeechCategory.fromCategoryId(speech.getCategoryId()).getCategoryName();
    }

    return SpeechDetail.builder()
        .title(speech.getTitle())
        .category(categoryName)
        .speechId(speech.getId())
        .userId(speech.getUser().getUserId())
        .speechMode(mode)
        .startsAt(speech.getRecordTime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd hh:mm")))
        .comment(speech.getComment())
        .build();
  }
}
