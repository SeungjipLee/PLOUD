package com.ssafy.ploud.domain.record.repository;

import com.ssafy.ploud.domain.record.FeedbackEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<FeedbackEntity, Integer> {

  List<FeedbackEntity> findBySpeechId(int speechId);

}
