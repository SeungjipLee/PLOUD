package com.ssafy.ploud.domain.speech.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.speech.dto.request.CommentRequest;
import com.ssafy.ploud.domain.speech.dto.request.FeedbackRequest;
import com.ssafy.ploud.domain.speech.dto.request.SpeechEndRequest;
import com.ssafy.ploud.domain.speech.dto.request.SpeechStartRequest;
import com.ssafy.ploud.domain.speech.dto.response.SpeechIdResDto;
import com.ssafy.ploud.domain.speech.service.SpeechService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "스피치 평가 API", description = "스피치 평가 관련 API")
@SecurityRequirement(name = "Bearer Authentication")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/speech")
@Slf4j
public class SpeechController {

    private final SpeechService speechService;

    @Operation(summary = "녹화 시작", description = "녹화 시작이 가능한 경우 speechId를 반환한다.")
    @PostMapping("/start")
    public ApiResponse<SpeechIdResDto> startSpeech(@AuthenticationPrincipal UserDetails loginUser,
        @RequestBody SpeechStartRequest speechStartRequest) {
        speechStartRequest.setUserId(loginUser.getUsername());
        return ApiResponse.ok("성공", new SpeechIdResDto(speechService.start(speechStartRequest)));
    }

    @Operation(summary = "녹화 종료", description = "녹화를 종료하고, 데시벨 평가를 진행한다.")
    @PostMapping("/end")
    public ApiResponse<?> endSpeech(@RequestBody SpeechEndRequest speechEndRequest) {
        speechService.endAndDecibel(speechEndRequest);
        return ApiResponse.ok("성공");
    }

    @Operation(summary = "명료도, 발화속도 평가", description = "ETRI로 API 요청을 보내고 score 점수를 반환한다.")
    @PostMapping("/assess")
    public ApiResponse<?> assessClarity(@RequestPart("audioFile") MultipartFile audioFile,
        @RequestParam("speechId") Integer speechId,
        @RequestParam("isLast") Boolean isLast) {
        return ApiResponse.ok("성공", speechService.clearity(audioFile, speechId, isLast));
    }

    @Operation(summary = "피드백 등록", description = "스피치에 대한 (익명)피드백을 등록한다.")
    @PostMapping("/fb")
    public ApiResponse<?> startSpeech(@RequestBody FeedbackRequest feedbackRequest) {
        speechService.feedback(feedbackRequest);
        return ApiResponse.ok("성공");
    }

    @Operation(summary = "개인 코멘트 등록", description = "스피치가 종료된 후 개인 코멘트를 등록한다.")
    @PostMapping("/comment")
    public ApiResponse<?> startSpeech(@RequestBody CommentRequest commentRequest) {
        speechService.comment(commentRequest);
        return ApiResponse.ok("성공");
    }
}
