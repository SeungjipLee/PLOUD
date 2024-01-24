package com.ssafy.ploud.domain.record.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class RecordStartRequest {
    String sessionId;
    Boolean hasAudio;
    Boolean hasVideo;

    // COMPOSED, INDIVIDUAL, COMPOSED_QUICK_START
    String outputMode;
}
