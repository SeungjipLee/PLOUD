package com.ssafy.ploud.domain.meeting.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class MeetingLeaveRequest {

    private String sessionId;
    private String token;
}
