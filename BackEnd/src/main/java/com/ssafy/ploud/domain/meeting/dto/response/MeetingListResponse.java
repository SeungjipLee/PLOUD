package com.ssafy.ploud.domain.meeting.dto.response;

import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeetingListResponse {
    List<MeetingInfo> meetingInfoList;
    public MeetingListResponse(List<MeetingInfo> meetingInfoList) {
        this.meetingInfoList = meetingInfoList;
    }
}
