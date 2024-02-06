package com.ssafy.ploud.domain.complain.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.complain.dto.ComplainUserRequestDto;
import com.ssafy.ploud.domain.complain.service.ComplainService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "신고 관리 API", description = "사용자 신고, 관리자 신고 조회 및 처리")
@SecurityRequirement(name = "Bearer Authentication")
@RestController
@RequestMapping("/api/complain")
@RequiredArgsConstructor
public class ComplainController {

  private final ComplainService complainService;

  @PostMapping()
  public ApiResponse<?> complainUser(@RequestBody ComplainUserRequestDto requestDto) {
    complainService.complainUser(requestDto);
    return ApiResponse.ok("신고 완료");
  }
}
