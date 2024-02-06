package com.ssafy.ploud.domain.speech.util;

import com.ssafy.ploud.domain.speech.dto.ClearityDto;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SpeechAssessUtil {

    private Map<Integer, List<ClearityDto>> clearness = new ConcurrentHashMap<>();

    public int decibels(int[] decibels) {
        long res = 0;
        for(int score : decibels){
            res += 100 - (50 - score);
        }

        return (int)(res / decibels.length);
    }

    public void addClearity(int speechId, ClearityDto clearityDto) {
        clearness.computeIfAbsent(speechId, k -> new ArrayList<>());
        clearness.get(speechId).add(clearityDto);
    }

    public Map<String, Integer> assess(int speechId) {
        // 발화시간 명확하게 수정해야함.
        double scriptCnt = 0;
        double scores = 0;
        double totalTime = 0;
        for(ClearityDto clearityDto : clearness.get(speechId)){
            scriptCnt += clearityDto.getCnt() / clearityDto.getAudioTime();
            scores += clearityDto.getFloatScore() * clearityDto.getAudioTime();
            totalTime += clearityDto.getAudioTime();
        }

        if(totalTime == 0){
            totalTime = 1;
        }
        int scriptPerMin  = (int)(scriptCnt * 60 / totalTime);

        int speed = 100 - (int) ((Math.abs(300 - scriptPerMin) / 300.0) * 40);

        int clearity = (int) (50 + 10 * (scores / totalTime));

        Map<String, Integer> res = new HashMap<>();

        if(clearity == 0) clearity = 69;
        if(speed == 0) speed = 69;

        res.put("clearity", clearity);
        res.put("speed", speed);

        clearness.remove(speechId);
        return res;
    }
}
