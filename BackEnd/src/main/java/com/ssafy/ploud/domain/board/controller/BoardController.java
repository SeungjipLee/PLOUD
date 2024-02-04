package com.ssafy.ploud.domain.board.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import com.ssafy.ploud.domain.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {

  private final BoardService boardService;

  @PostMapping("/create")
  public ApiResponse<?> createBoard(@RequestBody BoardRequest boardRequest) {
    boardService.createBoard(boardRequest, boardRequest.getUserId());
    return ApiResponse.ok("글쓰기 성공");
  }

  @GetMapping("/{id}")
  public ApiResponse<?> getBoardById(@PathVariable int id) {
    BoardResponse boardResponse = boardService.getBoardById(id);
    return ApiResponse.ok("게시글 조회 성공", boardResponse);
  }

  @PutMapping("/{id}")
  public ApiResponse<?> updateBoard(@PathVariable int id, @RequestBody BoardRequest boardRequest) {
    boardService.updateBoard(id, boardRequest);
    return ApiResponse.ok("글 수정 성공");
  }

  @DeleteMapping("/{id}")
  public ApiResponse<?> deleteBoard(@PathVariable int id) {
    boardService.deleteBoard(id);
    return ApiResponse.ok("글 삭제 성공");
  }
}
