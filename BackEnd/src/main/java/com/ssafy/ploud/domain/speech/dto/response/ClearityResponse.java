package com.ssafy.ploud.domain.speech.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ClearityResponse {
    String script;
    int scriptCnt;
    float score;
}
