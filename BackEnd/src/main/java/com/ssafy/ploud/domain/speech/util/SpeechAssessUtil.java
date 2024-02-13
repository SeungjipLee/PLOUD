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
        for(int db : decibels){
            res += 100 - Math.abs(50 - db);
        }



        return (int)(res / decibels.length);
    }

    public void addClearity(int speechId, ClearityDto clearityDto) {
        clearness.computeIfAbsent(speechId, k -> new ArrayList<>());
        clearness.get(speechId).add(clearityDto);
    }

    public Map<String, Integer> assess(int speechId) {
        Map<String, Integer> res = new HashMap<>();

        res.put("clearity", calculateScore(speechId));
        res.put("speed", calculateDecibel(speechId));

        clearness.remove(speechId);
        return res;
    }

    public int calculateScore(int speechId){
        double scores = 0;
        double totalTime = 0;

        for(ClearityDto clearityDto : clearness.get(speechId)){
            scores += adjustScore(clearityDto.getFloatScore()) * clearityDto.getAudioTime();
            totalTime += clearityDto.getAudioTime();
        }

        int totalScore = (int) (50 + 10 * (scores / totalTime));

        return Math.min(totalScore, 100);
    }

    public double adjustScore(double score){
        if(score >= 4.5){
            return score * 1.1;
        }else if(score >= 4.0){
            return score;
        }else if(score >= 3.5){
            return score * 0.95;
        }else if(score >= 3.0){
            return score * 0.9;
        }else if(score >= 2.0){
            return score * 0.8;
        }else{
            return score * 0.7;
        }
    }

    public int calculateDecibel(int speechId) {
        double standardScriptPerMinute = 300; // 평균
        double standardDeviation = 50;  // 표준 편차

        double totalScore = 0;

        for (ClearityDto clearityDto : clearness.get(speechId)) {
            double scriptCnt = clearityDto.getCnt(); // 음절수
            double recordTime = clearityDto.getAudioTime(); // 시간(s)

            double scriptPerMinute = 0;
            if(recordTime != 0){
                scriptPerMinute = (scriptCnt / recordTime) * 60;
            }

            double deviation = Math.abs(scriptPerMinute - standardScriptPerMinute);
            double score = 40 + 60 * Math.exp(-0.5 * Math.pow(deviation / standardDeviation, 2));

            totalScore += score;
        }

        int avarageScore = (int) totalScore / clearness.size();

        return avarageScore;
    }

}
