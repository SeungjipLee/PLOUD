package com.ssafy.ploud.domain.speech.repository;

import com.ssafy.ploud.domain.speech.SpeechEntity;
import com.ssafy.ploud.domain.user.UserEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpeechRepository extends JpaRepository<SpeechEntity, String> {
    SpeechEntity findById(int id);
}
