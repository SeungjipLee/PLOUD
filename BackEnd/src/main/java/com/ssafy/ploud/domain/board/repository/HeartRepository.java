package com.ssafy.ploud.domain.board.repository;

import com.ssafy.ploud.domain.board.BoardEntity;
import com.ssafy.ploud.domain.board.HeartEntity;
import com.ssafy.ploud.domain.user.UserEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeartRepository extends JpaRepository<HeartEntity, String> {

  Optional<HeartEntity> findByUserIdAndBoard(String userId, BoardEntity board);

  void delete(HeartEntity heart);
}
