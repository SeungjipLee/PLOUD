package com.ssafy.ploud.domain.meeting.controller;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/meeting")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    @PostMapping("/list")
    public ResponseEntity<?> listMeeting(MeetingSearchRequest request) {
        return ResponseEntity.ok(meetingService.list(request));
    }

    @PostMapping("/detail")
    public ResponseEntity<?> detailMeeting(String sessionId) {
        // 방을 찾을 수 없음.
        if (meetingService.findBySessionId(sessionId) == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(meetingService.detail(sessionId));
    }

    // 스터디룸 생성 POST / meeting/create
    @PostMapping("/create")
    public ResponseEntity<?> createMeeting(MeetingCreateRequest request) {
        return ResponseEntity.ok(meetingService.create(request));
    }

    // 방장이면 삭제, 아니면 나감
    @PostMapping("/leave")
    public ResponseEntity<?> leaveMeeting(MeetingLeaveRequest request) {
        // 방장이면 삭제하고 방장 아니면 나가야 하나?
        if (meetingService.leave(request)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    // 스터디룸 참가
    @PostMapping("/join")
    public ResponseEntity<?> joinMeeting(MeetingJoinRequest request) {
        MeetingInfoResponse meetingInfoResponse = meetingService.join(request);
        if (meetingInfoResponse != null) {
            return ResponseEntity.ok(meetingInfoResponse);
        }
        return ResponseEntity.badRequest().build();
    }
}
