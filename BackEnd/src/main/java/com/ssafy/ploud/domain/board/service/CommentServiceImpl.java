package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.domain.board.CommentEntity;
import com.ssafy.ploud.domain.board.dto.request.CommentRequest;
import com.ssafy.ploud.domain.board.dto.response.CommentResponse;
import com.ssafy.ploud.domain.board.repository.CommentRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
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
    commentRepository.deleteById(id);
  }

}
