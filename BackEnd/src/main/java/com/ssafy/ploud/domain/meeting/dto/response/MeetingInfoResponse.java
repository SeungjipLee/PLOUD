package com.ssafy.ploud.domain.meeting.dto.response;

import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class MeetingInfoResponse {
    private MeetingInfo meetingInfo;
    private String token;

    public MeetingInfoResponse(MeetingInfo meetingInfo, String token) {
        this.meetingInfo = meetingInfo;
        this.token = token;
    }
}
