package com.ssafy.ploud.domain.meeting.util;

import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingCreateRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingJoinRequest;
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

<<<<<<< HEAD
    private int num;
    private OpenVidu openVidu;
=======
    private int num = 0;
    private final OpenVidu openVidu;
>>>>>>> be/feature/meeting
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    private Map<String, Map<String, OpenViduRole>> mapSessionIdsTokens = new ConcurrentHashMap<>();

    @Getter
    private List<MeetingInfo> meetingList = new ArrayList<>();

    public OpenViduUtil(@Value("${openvidu.url}") String OPENVIDU_URL,
        @Value("${openvidu.secret}") String OPENVIDU_SECRET) {
        this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
<<<<<<< HEAD
        num = 0;
=======
>>>>>>> be/feature/meeting
    }

    public MeetingInfo join(MeetingJoinRequest request) {
        // 인원 수 확인
        MeetingInfo meetingInfo = findBySessionId(request.getSessionId());

        if(meetingInfo.getCurrentPeople().equals(meetingInfo.getMaxPeople())){
            return null;
        }

        // 비번 확인
        if(meetingInfo.getIsPrivate() && !meetingInfo.getPassword().equals(request.getPassword())){
            return null;
        }

        // 접속
        meetingInfo.setCurrentPeople(meetingInfo.getCurrentPeople() + 1);

        return meetingInfo;
    }

    public MeetingInfo create(MeetingCreateRequest request) {
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

            //
            MeetingInfo meetingInfo = new MeetingInfo(token, sessionId, request);
            meetingList.add(meetingInfo);

            return meetingInfo;
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
<<<<<<< HEAD
        for (int i = 0; i < meetingList.size(); ++i) {
            if (meetingList.get(i).getSessionId().equals(sessionId)) {
                return meetingList.get(i);
=======
        for (MeetingInfo meetingInfo : meetingList) {
            if (meetingInfo.getSessionId().equals(sessionId)) {
                return meetingInfo;
>>>>>>> be/feature/meeting
            }
        }
        return null;
    }
}
