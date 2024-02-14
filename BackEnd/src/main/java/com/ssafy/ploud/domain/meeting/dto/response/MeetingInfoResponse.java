package com.ssafy.ploud.domain.meeting.dto.response;

import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeetingInfoResponse {
    private MeetingInfo meetingInfo;
    private String ovToken;
    private String screenToken;

    public MeetingInfoResponse(MeetingInfo meetingInfo, String token, String token2) {
        this.meetingInfo = meetingInfo;
        this.ovToken = token;
        this.screenToken = token2;
    }
}
