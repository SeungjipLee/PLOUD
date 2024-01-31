package com.ssafy.ploud.domain.user.repository;

import com.ssafy.ploud.domain.user.UserEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> {

  UserEntity findByUserId(String userId);

  boolean existsByNickname(String nickname);

  boolean existsByUserId(String userId);

  boolean existsByEmail(String userEmail);

  Optional<UserEntity> findByEmailAndName(String email, String name);

  Optional<UserEntity> findByEmailAndUserId(String email, String userId);

  Optional<UserEntity> findByEmail(String email);

}
