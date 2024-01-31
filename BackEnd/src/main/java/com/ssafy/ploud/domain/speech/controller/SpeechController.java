package com.ssafy.ploud.domain.speech.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.speech.dto.request.AssessRequset;
import com.ssafy.ploud.domain.speech.service.SpeechService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "스피치 평가 API", description = "스피치 평가 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/speech")
@Slf4j
public class SpeechController {

    private final SpeechService speechService;

    // 일정 주기로 평가 해주는 API
    @Operation(summary = "명료도 평가", description = "명료도 평가 점수를 반환한다.")
    @PostMapping("/cl")
    public ApiResponse<?> clearitySpeech(@RequestParam("audioFile") MultipartFile audioFile) {
        if(speechService.clearityRating(audioFile)){
            return ApiResponse.ok("성공");
        }
        return ApiResponse.error("평가 실패");
    }

    // 발화 속도 및 명료도 점수 얻기 (다른 게 추가 될 수 있으므로 구현 X)
    @PostMapping("/clsp")
    public ApiResponse<?> clearitySpeedScore(@RequestParam AssessRequset clearitySpeedRequset){
        System.out.println("초당 발화 속도 : " + (float)clearitySpeedRequset.getScriptCnt() / clearitySpeedRequset.getRecordTime());
        System.out.println("명료도 점수 : " + clearitySpeedRequset.getScore());
        return ApiResponse.ok("등록 완료");
    }
}
