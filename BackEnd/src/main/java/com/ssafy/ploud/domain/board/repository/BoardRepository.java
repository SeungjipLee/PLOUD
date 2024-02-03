package com.ssafy.ploud.domain.board.repository;

import com.ssafy.ploud.domain.board.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardEntity, String> {
}
