package com.ssafy.ploud.domain.board.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import com.ssafy.ploud.domain.board.service.BoardService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.awt.print.Pageable;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.web.PageableDefault;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "게시판 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {

  private final BoardService boardService;

  @GetMapping("/")
  public ApiResponse<List<BoardResponse>> getAllBoards(
      @RequestParam(name = "search", required = false) String search,
      @PageableDefault(size = 10) Pageable pageable) {

    if (StringUtils.hasText(search)) {
      return ApiResponse.ok("게시글 목록 검색 성공", boardService.searchBoardsByTitle(search, pageable));
    } else {
      return ApiResponse.ok("게시글 목록 불러오기 성공", boardService.getAllBoards(pageable));
    }
  }

  @PostMapping("/create")
  public ApiResponse<?> createBoard(/*@RequestPart MultipartFile videoPath,*/
      @RequestBody BoardRequest boardRequest) {
    boardService.createBoard(boardRequest, boardRequest.getUserId(), boardRequest.getNickname());
    return ApiResponse.ok("글쓰기 성공");
  }

  @GetMapping("/{id}")
  public ApiResponse<?> getBoardById(@PathVariable int id) {
    return ApiResponse.ok("게시글 조회 성공", boardService.getBoardById(id));
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
