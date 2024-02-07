package com.ssafy.ploud.domain.sentence.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.sentence.dto.SentenceResponseDto;
import com.ssafy.ploud.domain.sentence.service.SentenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "명언 조회 API", description = "명언을 랜덤으로 하나 조회한다")
@RestController
@RequiredArgsConstructor
public class SentenceController {

  private final SentenceService service;

  @Operation(summary = "명언 랜덤 조회")
  @GetMapping("/api/sentence")
  ApiResponse<SentenceResponseDto> getSentence() {
    return ApiResponse.ok("명언 랜덤 조회 성공", service.getSentenceRandomly());
  }

}
