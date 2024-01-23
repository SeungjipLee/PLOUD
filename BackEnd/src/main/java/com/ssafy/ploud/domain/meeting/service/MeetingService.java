package com.ssafy.ploud.domain.meeting.service;

import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingCreateRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingLeaveRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingJoinRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingSearchRequest;
import java.util.List;

public interface MeetingService {

    public List<MeetingInfo> list(MeetingSearchRequest request);

    public MeetingInfo detail(String sessionId);

    public MeetingInfo create(MeetingCreateRequest request);


    MeetingInfo join(MeetingJoinRequest request);

    MeetingInfo findBySessionId(String sessionId);

    boolean leave(MeetingLeaveRequest request);
}