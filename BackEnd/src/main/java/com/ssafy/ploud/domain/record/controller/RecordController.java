package com.ssafy.ploud.domain.record.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.common.response.ResponseStatus;
import com.ssafy.ploud.domain.record.dto.request.RecordStartRequest;
import com.ssafy.ploud.domain.record.service.RecordService;
import io.openvidu.java.client.Recording;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @PostMapping("/start")
    public ApiResponse<?> startRecording(@RequestBody RecordStartRequest requset){
        Recording recording = recordService.startRecording(requset);
        if(recording != null){
            return ApiResponse.ok("녹화 시작", recording);
        }
        return ApiResponse.failure("녹화 실패", ResponseStatus.BAD_REQUEST);
    }
    // 녹화 종료
    @PostMapping("/stop")
    public ApiResponse<?> stopRecording(){
        return null;
    }

    // 녹화 조회
    @PostMapping("/detail")
    public ApiResponse<?> detailRecording(){
        return null;
    }

    // 녹화 목록 조회
    @PostMapping("/list")
    public ApiResponse<?> listRecording(){
        return null;
    }
}
