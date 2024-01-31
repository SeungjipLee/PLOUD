package com.ssafy.ploud.domain.record.service;

import com.ssafy.ploud.domain.meeting.util.OpenViduUtil;
import io.openvidu.java.client.Recording;
import io.openvidu.java.client.RecordingProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService{
    private OpenViduUtil openViduUtil;
    @Override
    public Recording startRecording(RecordStartRequest request) {
        String sessionId = request.getSessionId();
        Recording.OutputMode outputMode = Recording.OutputMode.valueOf(request.getOutputMode());
        boolean hasAudio = request.getHasAudio();
        boolean hasVideo = request.getHasVideo();

        RecordingProperties properties = new RecordingProperties.Builder().outputMode(outputMode).hasAudio(hasAudio)
            .hasVideo(hasVideo).build();

        System.out.println("Starting recording for session " + sessionId + " with properties {outputMode=" + outputMode
            + ", hasAudio=" + hasAudio + ", hasVideo=" + hasVideo + "}");

        return openViduUtil.startRecording(sessionId, properties);
    }
}
