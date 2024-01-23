package com.ssafy.ploud.domain.meeting.util;

import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingCreateRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingJoinRequest;
import com.ssafy.ploud.domain.meeting.dto.response.MeetingInfoResponse;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class OpenViduUtil {
    private int num = 0;
    private OpenVidu openVidu;
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    private Map<String, Map<String, OpenViduRole>> mapSessionIdsTokens = new ConcurrentHashMap<>();

    @Getter
    private List<MeetingInfo> meetingList = new ArrayList<>();

    public OpenViduUtil(@Value("${openvidu.url}") String OPENVIDU_URL,
        @Value("${openvidu.secret}") String OPENVIDU_SECRET) {
        this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public MeetingInfoResponse join(MeetingJoinRequest request) {
        MeetingInfo meetingInfo = findBySessionId(request.getSessionId());
        // 방 존재여부 확인
        if (meetingInfo == null) {
            return null;
        }
        // 인원 수 확인
        else if (meetingInfo.getCurrentPeople() != meetingInfo.getMaxPeople()) {
            return null;
        }
        // 비번 확인
        else if (meetingInfo.getIsPrivate() && !meetingInfo.getPassword()
            .equals(request.getPassword())) {
            return null;
        }
        // 접속
        meetingInfo.setCurrentPeople(meetingInfo.getCurrentPeople() + 1);

        String serverData = "{\"serverData\": \"" + request.getUserId() + "\"}";
        OpenViduRole role = OpenViduRole.PUBLISHER;

        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(
            ConnectionType.WEBRTC).data(serverData).role(role).build();

        MeetingInfoResponse meetingInfoResponse = null;

        try {
            String token = this.mapSessions.get(request.getSessionId())
                .createConnection(connectionProperties).getToken();

            this.mapSessionIdsTokens.get(request.getSessionId()).put(token, role);

            meetingInfoResponse = new MeetingInfoResponse(meetingInfo, token);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return meetingInfoResponse;
    }

    public MeetingInfoResponse create(MeetingCreateRequest request) {
        // Connection 생성
        String serverData = "{\"serverData\": \"" + request.getManagerId() + "\"}";
        OpenViduRole role = OpenViduRole.PUBLISHER;

        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(
            ConnectionType.WEBRTC).data(serverData).role(role).build();

        try {
            // Session 생성
            Session session = this.openVidu.createSession();
            String token = session.createConnection(connectionProperties).getToken();

            String sessionId = "session" + (num++);

            // Data 관리
            this.mapSessions.put(sessionId, session);
            this.mapSessionIdsTokens.put(sessionId, new ConcurrentHashMap<>());
            this.mapSessionIdsTokens.get(sessionId).put(token, role);

            MeetingInfo meetingInfo = new MeetingInfo(sessionId, request);
            meetingList.add(meetingInfo);

            MeetingInfoResponse meetingInfoResponse = new MeetingInfoResponse(meetingInfo, token);


            return meetingInfoResponse;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean leave(String sessionId, String token) {
        // 방이 존재하는 경우
        if (this.mapSessions.get(sessionId) != null
            && this.mapSessionIdsTokens.get(sessionId) != null) {

            if (this.mapSessionIdsTokens.get(sessionId).remove(token)
                != null) {

                // 나중에 이건 방장만
                if (this.mapSessionIdsTokens.get(sessionId).isEmpty()) {
                    this.mapSessions.remove(sessionId);
                }
                return true;
            }
        }
        return false;
    }

    public MeetingInfo findBySessionId(String sessionId) {
        for (int i = 0; i < meetingList.size(); ++i) {
            if (meetingList.get(i).getSessionId().equals(sessionId)) {
                return meetingList.get(i);
            }
        }
        return null;
    }
}
