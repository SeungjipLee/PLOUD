package com.ssafy.ploud.domain.meeting.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingCreateRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingJoinRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingLeaveRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingSearchRequest;
import com.ssafy.ploud.domain.meeting.dto.response.MeetingInfoResponse;
import com.ssafy.ploud.domain.meeting.util.OpenViduUtil;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService {

    private final OpenViduUtil openViduUtil;

    @Override
    public List<MeetingInfo> list(MeetingSearchRequest request) {
        List<MeetingInfo> list = openViduUtil.getMeetingList();

        List<MeetingInfo> res = new ArrayList<>();

        int categoryId = request.getCategoryId();
        String word = request.getWord();

        for (MeetingInfo meetingInfo : list) {
            if (!(categoryId != 0 && categoryId != meetingInfo.getCategoryId())
                && !(!word.isEmpty() && !meetingInfo.getTitle().contains(word))) {
                res.add(meetingInfo);
            }
        }

        return res;
    }

    @Override
    public MeetingInfo detail(String sessionId) {
        List<MeetingInfo> list = openViduUtil.getMeetingList();

        for (int i = 0; i < list.size(); ++i) {
            if (list.get(i).getSessionId().equals(sessionId)) {
                return list.get(i);
            }
        }
        throw new CustomException(ResponseCode.ROOM_NOT_FOUND);
    }

    @Override
    public MeetingInfoResponse create(MeetingCreateRequest request) {
        return openViduUtil.create(request);
    }

    @Override
    public MeetingInfoResponse join(MeetingJoinRequest request) {
        Object object = openViduUtil.join(request);
        if (object instanceof MeetingInfoResponse) {
            return (MeetingInfoResponse) object;
        }
        throw new CustomException(ResponseCode.BAD_REQUEST);
    }
    @Override
    public MeetingInfo findBySessionId(String sessionId) {
        return openViduUtil.findBySessionId(sessionId);
    }

    @Override
    public void leave(MeetingLeaveRequest request) {
        MeetingInfo meetingInfo = openViduUtil.findBySessionId(request.getSessionId());
        openViduUtil.leave(request.getSessionId(), request.getToken(), meetingInfo.getManagerId().equals(request.getUserId()));
    }

}
