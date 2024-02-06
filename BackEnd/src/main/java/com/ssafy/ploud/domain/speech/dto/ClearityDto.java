package com.ssafy.ploud.domain.speech.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ClearityDto {
    private String recognized;
    private int cnt;
    private double floatScore;
    private double audioTime;
}
