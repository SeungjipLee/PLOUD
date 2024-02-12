package com.ssafy.ploud.domain.speech.service;

import com.ssafy.ploud.domain.speech.dto.request.CommentRequest;
import com.ssafy.ploud.domain.speech.dto.request.FeedbackRequest;
import com.ssafy.ploud.domain.speech.dto.request.SpeechEndRequest;
import com.ssafy.ploud.domain.speech.dto.request.SpeechStartRequest;
import com.ssafy.ploud.domain.speech.dto.request.VideoUploadRequest;
import com.ssafy.ploud.domain.speech.dto.response.ClearityResponse;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

public interface SpeechService {
    Map<String, Integer> start(SpeechStartRequest speechStartRequest);
    void endAndDecibel(SpeechEndRequest speechEndRequest);
    void feedback(FeedbackRequest feedbackRequest);
    void comment(CommentRequest commentRequest);
    ClearityResponse clearity(MultipartFile audioFile, Integer speechId, Boolean isLast);
    void uploadVideo(VideoUploadRequest reqdto, String userId);

    Map<String, Long> findAllSpeechCount();
}
