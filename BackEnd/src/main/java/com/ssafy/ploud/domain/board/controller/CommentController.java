package com.ssafy.ploud.domain.board.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.board.dto.request.CommentRequest;
import com.ssafy.ploud.domain.board.dto.response.CommentResponse;
import com.ssafy.ploud.domain.board.service.CommentService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

  private final CommentService commentService;

  @GetMapping("/{boardId}")
  public ApiResponse<List<CommentResponse>> getAllComments(int boardId) {
    List<CommentResponse> commentResponses = commentService.getCommentsByBoardId(boardId);
    return ApiResponse.ok("댓글 목록 불러오기 성공", commentResponses);
  }

  @PostMapping("/")
  public ApiResponse<?> createComment(@RequestBody CommentRequest commentRequest) {
    commentService.createComment(commentRequest);
    return ApiResponse.ok("댓글 작성 성공");
  }

  @DeleteMapping("/{id}")
  public ApiResponse<?> deleteComment(@PathVariable int id) {
    commentService.deleteComment(id);
    return ApiResponse.ok("댓글 삭제 성공");
  }
}
