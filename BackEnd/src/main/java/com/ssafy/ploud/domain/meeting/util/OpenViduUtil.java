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
<<<<<<< HEAD
=======
import java.util.HashMap;
>>>>>>> be/feature/meeting
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

<<<<<<< HEAD
    public MeetingInfoResponse join(MeetingJoinRequest request) {
        MeetingInfo meetingInfo = findBySessionId(request.getSessionId());
        // 방 존재여부 확인
        if (meetingInfo == null) {
            return null;
        }
        // 인원 수 확인
        else if (meetingInfo.getCurrentPeople() != meetingInfo.getMaxPeople()) {
            return null;
=======
    public Object join(MeetingJoinRequest request) {
        MeetingInfo meetingInfo = findBySessionId(request.getSessionId());
        // 방 존재여부 확인
        if (meetingInfo == null) {
            return "방이 존재하지 않음";
        }
        // 인원 수 확인
        else if (meetingInfo.getCurrentPeople() != meetingInfo.getMaxPeople()) {
            return "인원 수 제한";
>>>>>>> be/feature/meeting
        }
        // 비번 확인
        else if (meetingInfo.getIsPrivate() && !meetingInfo.getPassword()
            .equals(request.getPassword())) {
<<<<<<< HEAD
            return null;
=======
            return "비밀번호 오류";
>>>>>>> be/feature/meeting
        }
        // 접속
        meetingInfo.setCurrentPeople(meetingInfo.getCurrentPeople() + 1);

        String serverData = "{\"serverData\": \"" + request.getUserId() + "\"}";
        OpenViduRole role = OpenViduRole.PUBLISHER;

        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(
            ConnectionType.WEBRTC).data(serverData).role(role).build();

<<<<<<< HEAD
        MeetingInfoResponse meetingInfoResponse = null;

=======
>>>>>>> be/feature/meeting
        try {
            String token = this.mapSessions.get(request.getSessionId())
                .createConnection(connectionProperties).getToken();

            this.mapSessionIdsTokens.get(request.getSessionId()).put(token, role);

<<<<<<< HEAD
            meetingInfoResponse = new MeetingInfoResponse(meetingInfo, token);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return meetingInfoResponse;
=======
            return new MeetingInfoResponse(meetingInfo, token);
        } catch (Exception e) {
            e.printStackTrace();
            return "에러 발생";
        }
>>>>>>> be/feature/meeting
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

<<<<<<< HEAD
            MeetingInfoResponse meetingInfoResponse = new MeetingInfoResponse(meetingInfo, token);


            return meetingInfoResponse;
=======
            return new MeetingInfoResponse(meetingInfo, token);
>>>>>>> be/feature/meeting
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

<<<<<<< HEAD
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
=======
    public boolean leave(String sessionId, String token, Boolean isManager) {
        // 방이 존재
        if (this.mapSessions.get(sessionId) != null
            && this.mapSessionIdsTokens.get(sessionId) != null) {
            // 접속 중
            if(this.mapSessionIdsTokens.get(sessionId).remove(token) != null){
                if(isManager){
                    this.mapSessionIdsTokens.remove(sessionId);
                    this.mapSessions.remove(sessionId);
                }
                return true;
            } else{
                // 토큰이 존재하지 않음.
                return false;
            }
        }
        // 세션이 존재하지 않음.
>>>>>>> be/feature/meeting
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
