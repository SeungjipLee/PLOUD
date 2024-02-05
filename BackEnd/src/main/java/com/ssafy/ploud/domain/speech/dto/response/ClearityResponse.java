package com.ssafy.ploud.domain.speech.dto.response;

import com.ssafy.ploud.domain.speech.dto.ClearityDto;
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

    public ClearityResponse(ClearityDto clearityDto) {
        this.script = clearityDto.getRecognized();
        this.scriptCnt = clearityDto.getCnt();
        this.score = clearityDto.getFloatScore();
    }
}
