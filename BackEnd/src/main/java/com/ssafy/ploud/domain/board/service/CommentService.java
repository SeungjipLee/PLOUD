package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.domain.board.dto.request.CommentRequest;
import com.ssafy.ploud.domain.board.dto.response.CommentResponse;
import java.util.List;

public interface CommentService {

  List<CommentResponse> getCommentsByBoardId(int boardId);

  void createComment(CommentRequest commentRequest, String userId);

  void deleteComment(int id, String userId);
}
