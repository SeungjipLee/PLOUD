package com.ssafy.ploud.domain.board.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.board.BoardEntity;
import com.ssafy.ploud.domain.board.dto.request.HeartRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import com.ssafy.ploud.domain.board.service.BoardService;
import com.ssafy.ploud.domain.board.service.HeartService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@RequestMapping("/api/board/heart")
public class HeartController {
  private final HeartService heartService;
  private final BoardService boardService;

  @PostMapping
  public ApiResponse<?> insertHeart(@RequestBody HeartRequest heartRequest,  @AuthenticationPrincipal UserDetails loginUser){
    heartService.insert(heartRequest, loginUser.getUsername());
    boardService.updateCount(boardService.getBoardById(heartRequest.getBoardId()),true);
    return ApiResponse.ok("좋아요");
  }

  @DeleteMapping
  public ApiResponse<?> deleteHeart(@RequestBody HeartRequest heartRequest,  @AuthenticationPrincipal UserDetails loginUser){
    heartService.delete(heartRequest, loginUser.getUsername());
    boardService.updateCount(boardService.getBoardById(heartRequest.getBoardId()),false);
    return ApiResponse.ok("좋아요 취소");
  }

}
