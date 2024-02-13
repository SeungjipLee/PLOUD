package com.ssafy.ploud.domain.sentence.dto;

import com.ssafy.ploud.domain.sentence.SentenceEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SentenceResponseDto {

  private String sentence;

  public static SentenceResponseDto of(SentenceEntity entity) {
    return SentenceResponseDto.builder()
        .sentence(entity.getSentence())
        .build();
  }

}
