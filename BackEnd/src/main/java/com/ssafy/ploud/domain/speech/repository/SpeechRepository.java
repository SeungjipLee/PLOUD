package com.ssafy.ploud.domain.speech.repository;
import com.ssafy.ploud.domain.speech.SpeechEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SpeechRepository extends JpaRepository<SpeechEntity, String> {
    Optional<SpeechEntity> findById(int id);

    List<SpeechEntity> findTop5ByUser_userIdOrderByRecordTimeDesc(String userId);

    List<SpeechEntity> findAllByUser_userIdOrderByRecordTimeAsc(String userId);

    List<SpeechEntity> findAllByUser_userIdAndSpeechVideoIsNotNull(String userId);

    @Query("SELECT COUNT(s) FROM SpeechEntity s")
    Long countAllSpeeches();

}
