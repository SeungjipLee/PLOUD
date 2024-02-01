package com.ssafy.ploud.domain.speech.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class SpeechEndRequest {
    private String sessionId;
    private int speechId;
    private int[] decibels;
}
