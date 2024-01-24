package com.ssafy.ploud.domain.record.service;

import com.ssafy.ploud.domain.record.dto.request.RecordStartRequest;
import io.openvidu.java.client.Recording;

public interface RecordService {

    Recording startRecording(RecordStartRequest requset);
}
