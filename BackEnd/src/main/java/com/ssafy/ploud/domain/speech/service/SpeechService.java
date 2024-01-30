package com.ssafy.ploud.domain.speech.service;

import com.ssafy.ploud.domain.speech.dto.response.ClearityResponse;
import org.springframework.web.multipart.MultipartFile;

public interface SpeechService {
    ClearityResponse clearityRating(MultipartFile audioFile);
}
