package com.ssafy.ploud.domain.speech.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class FeedbackRequest {
    private String userId;
    private String sessionId;
    private String content;
}
