package com.ssafy.ploud.domain.speech.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class SpeechStartRequest {
    String userId;
    String title;
    boolean personal;
    int categoryId;
    String sessionId;
    int scriptId;
}
