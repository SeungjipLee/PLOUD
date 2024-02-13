package com.ssafy.ploud.domain.speech.util;

import com.ssafy.ploud.domain.speech.dto.ClearityDto;
import java.util.ArrayList;
import java.util.Arrays;
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
        double lowStandardDecibel = 55;
        double highStandardDecibel = 65;
        double standardDeviation = 20;
        double silenceDecibel = 30;

        int silenceDuration = 0;
        int silenceCnt = 0;
        double totalScore = 0;

        for (int db : decibels) {
            if(db >= lowStandardDecibel && db <= highStandardDecibel){
                totalScore += 100;
            }else{
                double deviation = Math.min(Math.abs(db - lowStandardDecibel), Math.abs(db - highStandardDecibel));
                totalScore += 20 + 80 * Math.exp(-0.5 * Math.pow(deviation / standardDeviation, 2));
            }

            if(db > 30){
                silenceDuration = 0;
            }else{
                if(++silenceDuration == 30){
                    silenceCnt++;
                    silenceDuration = 0;
                }
            }
        }
        int avarageScore = (int) (totalScore / decibels.length);

        double perSilenceMinute = silenceCnt / (decibels.length * 0.1 / 60);

        if(perSilenceMinute > 1){
            avarageScore = (int) (avarageScore * (100 - perSilenceMinute * 10) / 100);
        }

        return avarageScore;
    }

    public void addClearity(int speechId, ClearityDto clearityDto) {
        clearness.computeIfAbsent(speechId, k -> new ArrayList<>());
        clearness.get(speechId).add(clearityDto);
    }

    public Map<String, Integer> assess(int speechId) {
        Map<String, Integer> res = new HashMap<>();

        res.put("clearity", calculateScore(speechId));
        res.put("speed", calculateSpeed(speechId));

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

        int totalScore = (int) (30 + 14 * (scores / totalTime));

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

    public int calculateSpeed (int speechId) {
        double lowStandardScriptPerMinute = 300;
        double highStandardScriptPerMinute = 320;
        double standardDeviation = 50;

        double totalScore = 0;

        for (ClearityDto clearityDto : clearness.get(speechId)) {
            double scriptCnt = clearityDto.getCnt();
            double recordTime = clearityDto.getAudioTime();

            double scriptPerMinute = 0;
            if(recordTime != 0){
                scriptPerMinute = (scriptCnt / recordTime) * 60;
            }

            if(scriptPerMinute >= lowStandardScriptPerMinute && scriptPerMinute <= highStandardScriptPerMinute){
                totalScore += 100;
            }else{
                double deviation = Math.min(Math.abs(scriptPerMinute - lowStandardScriptPerMinute), Math.abs(scriptPerMinute - highStandardScriptPerMinute));
                totalScore += 40 + 60 * Math.exp(-0.5 * Math.pow(deviation / standardDeviation, 2));
            }
        }

        int avarageScore = (int) totalScore / clearness.get(speechId).size();

        return avarageScore;
    }

}
