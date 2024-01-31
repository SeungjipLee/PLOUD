package com.ssafy.ploud.domain.record.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.record.service.RecordService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "발표 관리 API", description = "녹화 시작, 종료, 조회")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/record")
@Slf4j
public class RecordController {

    private final RecordService recordService;

    // 녹화 시작
    @PostMapping("/start")
    public ApiResponse<?> startRecording(){
        // 녹화 시작 가능한지 확인

        // True / False
        return null;
    }
    // 녹화 종료
    @PostMapping("/stop")
    public ApiResponse<?> stopRecording(){
        // 녹화 종료 후 정보 저장

        // 스피치 평가가 끝날 떄 까지 클라이언트 대기
        // 평가가 종료된 경우 종합 결과를 보내줌

        return null;
    }

    // 녹화 조회
    @PostMapping("/detail")
    public ApiResponse<?> detailRecording(){
        // 녹화 영상에 대한 상세 정보를 조회
        // 제목, 영상 위치

        // 종합 결과, 음성 분석, 청자 피드백 종합.

        //

        return null;
    }

    // 녹화 목록 조회
    @PostMapping("/list")
    public ApiResponse<?> listRecording(){
        // 나의 녹화 목록을 조회

        // 녹화 PK, 녹화 날짜, 제목, 영상 길이 등
        return null;
    }

    // 녹화 영상 삭제
    @DeleteMapping("/delete")
    public ApiResponse<?> deleteRecording(){
        // 녹화 영상 삭제

        // 로컬의 저장된 영상 삭제.
        // 이거 클라이언트에서 처리하고

        // 서버는 그냥 DB 수정만
        return null;
    }
}
