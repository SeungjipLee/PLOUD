package com.ssafy.ploud.domain.meeting.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class MeetingJoinRequest {
    String sessionId;
    String userId;
    String password;
}
