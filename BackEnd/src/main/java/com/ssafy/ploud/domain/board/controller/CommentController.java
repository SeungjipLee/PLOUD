package com.ssafy.ploud.domain.board.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.board.dto.request.CommentRequest;
import com.ssafy.ploud.domain.board.dto.response.CommentResponse;
import com.ssafy.ploud.domain.board.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "댓글 API")
@RestController
@SecurityRequirement(name = "Bearer Authentication")
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

  private final CommentService commentService;

  @Operation(summary = "댓글 조회", description = "boardId번 게시글의 모든 댓글 조회")
  @GetMapping("/{boardId}")
  public ApiResponse<List<CommentResponse>> getAllComments(int boardId) {
    List<CommentResponse> commentResponses = commentService.getCommentsByBoardId(boardId);
    return ApiResponse.ok("댓글 목록 불러오기 성공", commentResponses);
  }

  @PostMapping()
  @Operation(summary = "댓글 작성", description = "boardId번 게시글 댓글 작성")
  public ApiResponse<?> createComment(@RequestBody CommentRequest commentRequest, @AuthenticationPrincipal UserDetails loginUser) {
    commentService.createComment(commentRequest, loginUser.getUsername());
    return ApiResponse.ok("댓글 작성 성공");
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "댓글 삭제", description = "Id번 댓글 삭제")
  public ApiResponse<?> deleteComment(@PathVariable int id, @AuthenticationPrincipal UserDetails loginUser) {
    commentService.deleteComment(id, loginUser.getUsername());
    return ApiResponse.ok("댓글 삭제 성공");
  }
}
