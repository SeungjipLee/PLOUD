package com.ssafy.ploud.domain.speech.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class SpeechStartRequest {
    private String userId;
    private String title;
    private boolean personal;
    private int categoryId;
    private String sessionId;
    private int scriptId;
}
