package com.ssafy.ploud.domain.board.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import com.ssafy.ploud.domain.board.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "게시판 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
@SecurityRequirement(name = "Bearer Authentication")
public class BoardController {

  private final BoardService boardService;

  @GetMapping("/")
  @Operation(summary = "게시글 전체 목록 조회", description = "전체 게시글 조회 페이징")
  public ApiResponse<List<BoardResponse>> getAllBoards(
      @PageableDefault(size = 10,
          sort = {"username"}, direction = Sort.Direction.DESC) Pageable pageable) {
    return ApiResponse.ok("게시글 목록 불러오기 성공", boardService.getAllBoards(pageable).getContent());
  }

  @PostMapping("/create")
  public ApiResponse<?> createBoard(@RequestBody BoardRequest boardRequest,
      @AuthenticationPrincipal UserDetails loginUser) {
    boardService.createBoard(boardRequest, loginUser.getUsername());
    return ApiResponse.ok("글쓰기 성공");
  }

  @GetMapping("/{id}")
  public ApiResponse<?> getBoardById(@PathVariable int id,
      @AuthenticationPrincipal UserDetails loginUser) {
    return ApiResponse.ok("게시글 조회 성공", boardService.getBoardById(id, loginUser.getUsername()));
  }

  @PutMapping("/{id}")
  public ApiResponse<?> updateBoard(@PathVariable int id, @RequestBody BoardRequest boardRequest,
      @AuthenticationPrincipal UserDetails loginUser) {
    boardService.updateBoard(id, boardRequest, loginUser.getUsername());
    return ApiResponse.ok("글 수정 성공");
  }

  @DeleteMapping("/{id}")
  public ApiResponse<?> deleteBoard(@PathVariable int id,
      @AuthenticationPrincipal UserDetails loginUser) {
    boardService.deleteBoard(id, loginUser.getUsername());
    return ApiResponse.ok("글 삭제 성공");
  }
}
