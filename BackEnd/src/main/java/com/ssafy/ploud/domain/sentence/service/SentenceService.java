package com.ssafy.ploud.domain.sentence.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.sentence.SentenceEntity;
import com.ssafy.ploud.domain.sentence.dto.SentenceResponseDto;
import com.ssafy.ploud.domain.sentence.repository.SentenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SentenceService {

  private final SentenceRepository repository;

  public SentenceResponseDto getSentenceRandomly() {
    long count = repository.count();
    SentenceEntity sentence = repository.findById((int)(Math.random()*count+1))
        .orElseThrow(() -> new CustomException(ResponseCode.SENTENCE_NOT_FOUND));
    return SentenceResponseDto.of(sentence);
  }

}
