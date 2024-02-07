package com.ssafy.ploud.domain.board.repository;

import com.ssafy.ploud.domain.board.BoardEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardEntity, String> {

  Optional<BoardEntity> findById(int id);

  void deleteById(int id);
  Page<BoardEntity> findAllByOrderByIdDesc(Pageable pageable);

}
