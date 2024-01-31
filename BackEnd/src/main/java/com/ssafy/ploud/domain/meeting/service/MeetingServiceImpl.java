package com.ssafy.ploud.domain.meeting.service;

import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingCreateRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingLeaveRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingJoinRequest;
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

        String categoryId = request.getCategoryId();
        String word = request.getWord();

        for (int i = 0; i < list.size(); ++i) {
            if (list.get(i).getCategoryId().equals(categoryId)) {
                res.add(list.get(i));
            } else if (list.get(i).getTitle().indexOf(word) != 0) {
                res.add(list.get(i));
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
        return null;
    }

    @Override
    public MeetingInfoResponse create(MeetingCreateRequest request) {
        return openViduUtil.create(request);
    }

    @Override
    public Object join(MeetingJoinRequest request) {
        return openViduUtil.join(request);
    }
    @Override
    public MeetingInfo findBySessionId(String sessionId) {
        return openViduUtil.findBySessionId(sessionId);
    }

    @Override
    public boolean leave(MeetingLeaveRequest request) {
        MeetingInfo meetingInfo = openViduUtil.findBySessionId(request.getSessionId());
        // 방장인 경우
        if(meetingInfo.getManagerId().equals(request.getUserId())){
            return openViduUtil.leave(request.getSessionId(), request.getToken(), true);
        }else{
            return openViduUtil.leave(request.getSessionId(), request.getToken(), false);
        }
    }

}
