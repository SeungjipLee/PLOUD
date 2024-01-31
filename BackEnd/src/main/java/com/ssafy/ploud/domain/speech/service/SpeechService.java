package com.ssafy.ploud.domain.speech.service;

import org.springframework.web.multipart.MultipartFile;

public interface SpeechService {
    boolean clearityRating(MultipartFile audioFile);
}
