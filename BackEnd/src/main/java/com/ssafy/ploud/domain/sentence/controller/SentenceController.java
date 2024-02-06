package com.ssafy.ploud.domain.sentence.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.sentence.dto.SentenceResponseDto;
import com.ssafy.ploud.domain.sentence.service.SentenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SentenceController {

  private final SentenceService service;

  @RequestMapping("/api/sentence")
  ApiResponse<SentenceResponseDto> getSentence() {
    return ApiResponse.ok("명언 랜덤 조회 성공", service.getSentenceRandomly());
  }

}
