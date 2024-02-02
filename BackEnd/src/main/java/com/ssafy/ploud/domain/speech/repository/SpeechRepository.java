package com.ssafy.ploud.domain.speech.repository;
import com.ssafy.ploud.domain.speech.SpeechEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpeechRepository extends JpaRepository<SpeechEntity, String> {
    Optional<SpeechEntity> findById(int id);

    List<SpeechEntity> findTop5ByUser_userIdOrderByRecordTimeDesc(String userId);

    List<SpeechEntity> findAllByUser_userIdOrderByRecordTimeAsc(String userId);

}
