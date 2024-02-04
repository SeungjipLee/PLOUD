package com.ssafy.ploud.domain.board.repository;

import com.ssafy.ploud.domain.board.CommentEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentEntity, String> {

  void deleteById(int id);

  List<CommentEntity> findByBoardId(int boardId);
}
