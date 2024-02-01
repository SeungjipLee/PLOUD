package com.ssafy.ploud.domain.meeting.util;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingCreateRequest;
import com.ssafy.ploud.domain.meeting.dto.request.MeetingJoinRequest;
import com.ssafy.ploud.domain.meeting.dto.response.MeetingInfoResponse;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Recording;
import io.openvidu.java.client.RecordingProperties;
import io.openvidu.java.client.Session;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class OpenViduUtil {
    private int num = 0;
    private OpenVidu openVidu;
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();

    // session, token, role
    private Map<String, Map<String, OpenViduRole>> mapSessionIdsTokens = new ConcurrentHashMap<>();

    // 현재 생성중인 방
    @Getter
    private List<MeetingInfo> meetingList = new ArrayList<>();
    @Getter
    private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();

    @Autowired
    public OpenViduUtil(@Value("${openvidu.url}") String OPENVIDU_URL,
        @Value("${openvidu.secret}") String OPENVIDU_SECRET) {
        this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public Object join(MeetingJoinRequest request) {
        MeetingInfo meetingInfo = findBySessionId(request.getSessionId());

        // 인원 수 확인
        if (meetingInfo.getCurrentPeople() == meetingInfo.getMaxPeople()) {
            throw new CustomException(ResponseCode.ROOM_FULL);
        }
        // 비번 확인
        else if (meetingInfo.getIsPrivate() && !meetingInfo.getPassword()
            .equals(request.getPassword())) {
            throw new CustomException(ResponseCode.ROOM_PASSWORD_ERROR);
        }
        // 녹화 확인
        else if(meetingInfo.getSpeechId() != -1){
            throw new CustomException(ResponseCode.RECORD_PROCEEDING);
        }

        // 접속
        meetingInfo.setCurrentPeople(meetingInfo.getCurrentPeople() + 1);

        String serverData = "{\"serverData\": \"" + request.getUserId() + "\"}";
        OpenViduRole role = OpenViduRole.PUBLISHER;

        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(
            ConnectionType.WEBRTC).data(serverData).role(role).build();

        try {
            String token = this.mapSessions.get(request.getSessionId())
                .createConnection(connectionProperties).getToken();

            this.mapSessionIdsTokens.get(request.getSessionId()).put(token, role);

            return new MeetingInfoResponse(meetingInfo, token);
        } catch (Exception e) {
            throw new CustomException(ResponseCode.OPENVIDU_ERROR);
        }
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

            return new MeetingInfoResponse(meetingInfo, token);
        } catch (Exception e) {
            throw new CustomException(ResponseCode.OPENVIDU_ERROR);
        }
    }

    public void leave(String sessionId, String token, Boolean isManager) {
        if (this.mapSessions.get(sessionId) != null
            && this.mapSessionIdsTokens.get(sessionId) != null) {
            if(this.mapSessionIdsTokens.get(sessionId).remove(token) != null){
                if(isManager){
                    this.mapSessionIdsTokens.remove(sessionId);
                    this.mapSessions.remove(sessionId);
                }
            } else{
                throw new CustomException(ResponseCode.OPENBVIDU_TOKEN_ERROR);
            }
        }else{
            throw new CustomException(ResponseCode.SESSION_NOT_FOUND);
        }
    }

    public MeetingInfo findBySessionId(String sessionId) {
        for (MeetingInfo meetingInfo : meetingList) {
            if (meetingInfo.getSessionId().equals(sessionId)) {
                return meetingInfo;
            }
        }
        throw new CustomException(ResponseCode.SESSION_NOT_FOUND);
    }
}
