package com.ssafy.ploud.domain.record.service;

import io.openvidu.java.client.Recording;

public interface RecordService {

    Recording startRecording(RecordStartRequest requset);
}
