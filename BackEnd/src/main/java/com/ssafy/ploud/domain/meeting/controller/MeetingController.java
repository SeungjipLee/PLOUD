package com.ssafy.ploud.domain.meeting.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.common.response.ResponseStatus;
import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingCreateRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingLeaveRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingJoinRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingSearchRequest;
import com.ssafy.ploud.domain.meeting.dto.response.MeetingInfoResponse;
import com.ssafy.ploud.domain.meeting.service.MeetingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/meeting")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    @PostMapping("/list")
    public ApiResponse<?> listMeeting(@RequestBody MeetingSearchRequest request) {
        return ApiResponse.ok("목록 조회 성공", meetingService.list(request));
    }

    @PostMapping("/detail")
    public ApiResponse<?> detailMeeting(@RequestBody String sessionId) {
        if (meetingService.findBySessionId(sessionId) == null) {
            return ApiResponse.failure("방을 찾을 수 없음", ResponseStatus.NOT_FOUND);
        }
        return ApiResponse.ok("조회 성공", meetingService.detail(sessionId));
    }

    @PostMapping("/create")
    public ApiResponse<?> createMeeting(@RequestBody MeetingCreateRequest request) {
        return ApiResponse.ok("방 생성 성공", meetingService.create(request));
    }

    @PostMapping("/leave")
    public ApiResponse<?> leaveMeeting(@RequestBody MeetingLeaveRequest request) {
        if (meetingService.leave(request)) {
            return ApiResponse.ok("종료 성공");
        }
        return ApiResponse.failure("종료 실패", ResponseStatus.BAD_REQUEST);
    }

    @PostMapping("/join")
    public ApiResponse<?> joinMeeting(@RequestBody MeetingJoinRequest request) {
        Object object = meetingService.join(request);
        if (object instanceof MeetingInfoResponse) {
            return ApiResponse.ok("접속 성공", (MeetingInfoResponse) object);
        }
        return ApiResponse.failure((String) object, ResponseStatus.BAD_REQUEST);
    }
}
