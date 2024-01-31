package com.ssafy.ploud.domain.speech.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ClearityDto {
    String recognized;
    int cnt;
    float floatScore;

}
