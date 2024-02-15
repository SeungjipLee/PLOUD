package com.ssafy.ploud.domain.sentence.repository;

import com.ssafy.ploud.domain.sentence.SentenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SentenceRepository extends JpaRepository<SentenceEntity, Integer> {

  @Override
  long count();
}
