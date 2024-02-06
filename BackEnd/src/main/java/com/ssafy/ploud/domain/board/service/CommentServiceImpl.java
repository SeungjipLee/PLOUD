package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.board.BoardEntity;
import com.ssafy.ploud.domain.board.CommentEntity;
import com.ssafy.ploud.domain.board.dto.request.CommentRequest;
import com.ssafy.ploud.domain.board.dto.response.CommentResponse;
import com.ssafy.ploud.domain.board.repository.CommentRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class CommentServiceImpl implements CommentService {

  private CommentRepository commentRepository;

  @Override
  public List<CommentResponse> getCommentsByBoardId(int boardId) {
    List<CommentEntity> commentEntities = commentRepository.findByBoardId(boardId);
    return commentEntities.stream()
        .map(CommentResponse::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public void createComment(CommentRequest commentRequest) {
    CommentEntity commentEntity = CommentEntity.createComment(commentRequest);
    commentRepository.save(commentEntity);
  }

  @Override
  public void deleteComment(int id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String userId = authentication.getName();

    CommentEntity commentEntity = (CommentEntity) commentRepository.findById(id)
        .orElseThrow(() -> new CustomException(ResponseCode.COMMENT_NOT_FOUND));

    if (!commentEntity.getUserId().equals(userId)) {
      throw new CustomException(ResponseCode.NO_PERMISSION);
    }
    commentRepository.deleteById(id);
  }

}
