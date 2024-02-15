package com.ssafy.ploud.domain.board.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.board.BoardEntity;
import com.ssafy.ploud.domain.board.dto.request.HeartRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import com.ssafy.ploud.domain.board.service.BoardService;
import com.ssafy.ploud.domain.board.service.HeartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "좋아요 API")
@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@RequestMapping("/api/board/heart")
public class HeartController {
  private final HeartService heartService;

  @Operation(summary = "좋아요 등록 또는 취소", description = "이미 좋아요를 눌렀다면 취소한다")
  @PostMapping
  public ApiResponse<?> pressHeart(@RequestBody HeartRequest heartRequest,
      @AuthenticationPrincipal UserDetails loginUser) {
    Map<String, Integer> heartCount = heartService.updateHeart(heartRequest,
        loginUser.getUsername());
    return ApiResponse.ok("좋아요 처리 성공", heartCount);
  }

}
