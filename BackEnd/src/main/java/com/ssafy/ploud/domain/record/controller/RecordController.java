package com.ssafy.ploud.domain.record.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.record.dto.request.RecordListRequest;
import com.ssafy.ploud.domain.record.service.RecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "스피치 결과 조회 API", description = "목록 조회, 상세 조회, 영상 삭제, 통계 조회")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/record")
@Slf4j
public class RecordController {

    private final RecordService recordService;

    // 결과 상세 조회
    @Operation(summary = "스피치 결과 조회", description = "결과 페이지에 나타낼 정보들을 조회한다.")
    @GetMapping("/{speechId}")
    public ApiResponse<?> detailSpeech(@PathVariable("speechId") int SpeechId){
        return ApiResponse.ok("성공", recordService.getSpeechDetail(SpeechId));
    }

    // 결과 목록 조회
    @Operation(summary = "스피치 결과 목록 조회", description = "스피치 결과 목록을 조회한다.")
    @PostMapping()
    public ApiResponse<?> listSpeech(RecordListRequest recordListRequest){
        return ApiResponse.ok("성공", recordService.getSpeechList(recordListRequest));
    }

    // 영상 데이터 삭제
    @Operation(summary = "영상 정보 삭제", description = "DB에 있는 영상 정보를 삭제하고 video path를 반환한다.(client가 영상 삭제)")
    @DeleteMapping("/{speechId}")
    public ApiResponse<?> deleteVideo(@PathVariable("speechId") int speechId) {
        return ApiResponse.ok("성공", recordService.deleteVideo(speechId));
    }

    // 통계 조회
    @Operation(summary = "마이페이지 스피치 통계 조회", description = "마이페이지에 표시할 스피치 통계 정보를 조회한다.")
    @PostMapping("/score")
    public ApiResponse<?> scoreSpeech(){
        return ApiResponse.ok("성공", recordService.getSpeechScore());
    }
}
