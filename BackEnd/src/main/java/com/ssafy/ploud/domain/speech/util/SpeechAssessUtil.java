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
        int scriptCnt = 0;
        float scores = 0;
        for(ClearityDto clearityDto : clearness.get(speechId)){
            scriptCnt += clearityDto.getCnt();
            scores += clearityDto.getFloatScore();
        }

        int scriptPerMin  = (int) scriptCnt / (10 * clearness.get(speechId).size() / 60);
        int clearity = 100 - 100 * (Math.abs(310 - scriptPerMin) / 310);

        //
        int speed = (int) (50 + 20 * scores / clearness.get(speechId).size());

        Map<String, Integer> res = new HashMap<>();
        res.put("clearity", clearity);
        res.put("speed", speed);

        clearness.remove(speechId);
        return res;
    }
}
