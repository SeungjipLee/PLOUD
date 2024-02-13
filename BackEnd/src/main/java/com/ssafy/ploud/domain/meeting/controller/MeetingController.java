package com.ssafy.ploud.domain.meeting.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingCreateRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingJoinRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingLeaveRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingSearchRequest;
import com.ssafy.ploud.domain.meeting.service.MeetingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "스터디 룸 API", description = "스터디 룸 조회, 생성, 삭제, 접속, 종료")
@RestController
@SecurityRequirement(name = "Bearer Authentication")
@RequestMapping("/api/meeting")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    @PostMapping("/list")
    public ApiResponse<?> listMeeting(@RequestBody MeetingSearchRequest request) {
        return ApiResponse.ok("목록 조회 성공", meetingService.list(request));
    }

    @PostMapping("/detail")
    public ApiResponse<?> detailMeeting(@RequestBody String sessionId) {
        return ApiResponse.ok("조회 성공", meetingService.detail(sessionId));
    }

    @PostMapping("/create")
    public ApiResponse<?> createMeeting(
        @RequestBody MeetingCreateRequest request) {
        return ApiResponse.ok("방 생성 성공", meetingService.create(request));
    }

    @PostMapping("/leave")
    public ApiResponse<?> leaveMeeting(@AuthenticationPrincipal UserDetails loginUser,
        @RequestBody MeetingLeaveRequest request) {
        request.setUserId(loginUser.getUsername());
        meetingService.leave(request);
        return ApiResponse.ok("종료 성공");
    }

    @PostMapping("/join")
    public ApiResponse<?> joinMeeting(@AuthenticationPrincipal UserDetails loginUser,
        @RequestBody MeetingJoinRequest request) {
        request.setUserId(loginUser.getUsername());
        return ApiResponse.ok("접속 성공", meetingService.join(request));
    }
}
