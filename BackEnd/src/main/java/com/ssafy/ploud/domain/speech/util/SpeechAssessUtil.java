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

    // 데시벨 평가
    public int decibels(int[] decibels) {
        // 데시벨 데이터 없는 경우
        if(decibels.length == 0){
            return 0;
        }

        // 기준값
        double lowStandardDecibel = 55;
        double highStandardDecibel = 65;
        double standardDeviation = 20;
        double silenceDecibel = 30;

        // 점수
        double totalScore = 0;

        // 침묵
        int silenceDuration = 0;
        int silenceCnt = 0;

        // 디버깅용 변수
        int totalDb = 0;

        for (int db : decibels) {
            totalDb += db;

            // 기준 데시벨 이하 침묵으로 간주
            if(db <= silenceDecibel){
                // 침묵 3초 이상 시 카운트
                if(++silenceDuration == 30){
                    silenceCnt++;
                    silenceDuration = 0;
                }
            }else{
                silenceDuration = 0;

                // 55 ~ 65 데시벨의 경우 100점
                if(db >= lowStandardDecibel && db <= highStandardDecibel){
                    totalScore += 100;
                }
                // 그 외의 부분은 평균 60, 표준편차 20으로 확률밀도 계산 후 점수로 변환
                else{
                    double deviation = Math.min(Math.abs(db - lowStandardDecibel), Math.abs(db - highStandardDecibel));
                    totalScore += 100 * Math.exp(-0.5 * Math.pow(deviation / standardDeviation, 2));
                }
            }
        }

        // 평균 점수
        int avarageScore = (int) (totalScore / decibels.length);

        // 분당 침묵 횟수
        double perSilenceMinute = silenceCnt / (decibels.length * 0.1 / 60);

        // 분당 침묵 횟수가 일정 횟수 이상이면 감점
        if(perSilenceMinute > 2){
            avarageScore = (int) (avarageScore * (100 - perSilenceMinute  *  5) / 100);
        }

        log.debug("분당 침묵 횟수 : " + perSilenceMinute + ", 평균 데시벨 : " + totalDb / decibels.length + ", 평가 점수 : " + avarageScore);

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

    // 명료도 평가
    public int calculateScore(int speechId){
        // 점수
        double scores = 0;

        // 시간
        double totalTime = 0;

        List<ClearityDto> clearityList = clearness.get(speechId);

        // 평가내용이 없는 경우
        if(clearityList.isEmpty()){
            return 0;
        }

        // adjustScore : 점수 별 가중치 부여
        // 각 평가점수마다 시간이 조금씩 다르기 때문에 score * time 과 time 체크
        for(ClearityDto clearityDto : clearityList){
            scores += adjustScore(clearityDto.getFloatScore()) * clearityDto.getAudioTime();
            totalTime += clearityDto.getAudioTime();
        }

        // 100점으로 환산
        int totalScore = (int) (20 * (scores / totalTime));

        return Math.min(totalScore, 100);
    }

    // 명료도 점수 가중치
    public double adjustScore(double score){
        if(score >= 4.5){
            return score * 1.1;
        }else if(score >= 4.0){
            return score;
        }else if(score >= 3.5){
            return score * 0.9;
        }else if(score >= 3.0){
            return score * 0.8;
        }else if(score >= 2.0){
            return score * 0.7;
        }else{
            return score * 0.6;
        }
    }

    // 발화 속도 평가
    public int calculateSpeed (int speechId) {
        // 기준 값
        double lowStandardScriptPerMinute = 290;
        double highStandardScriptPerMinute = 310;
        double standardDeviation = 100;

        double totalScore = 0;

        List<ClearityDto> clearityList = clearness.get(speechId);

        // 평가내용이 없는 경우
        if(clearityList.isEmpty()){
            return 0;
        }

        for (ClearityDto clearityDto : clearityList) {
            double scriptCnt = clearityDto.getCnt();
            double recordTime = clearityDto.getAudioTime();

            // 분당 음절수로 환산
            double scriptPerMinute = 0;
            if(recordTime != 0){
                scriptPerMinute = (scriptCnt / recordTime) * 60;
            }

            // 290 ~ 310 의 경우 100점
            if(scriptPerMinute >= lowStandardScriptPerMinute && scriptPerMinute <= highStandardScriptPerMinute){
                totalScore += 100;
            }
            // 평균 300, 표준편차 100으로 확률밀도 계산 후 점수로 변환
            else {
                double deviation = Math.min(Math.abs(scriptPerMinute - lowStandardScriptPerMinute), Math.abs(scriptPerMinute - highStandardScriptPerMinute));
                totalScore += 100 * Math.exp(-0.5 * Math.pow(deviation / standardDeviation, 2));
            }
        }

        // 평균 점수
        int avarageScore = (int) totalScore / clearness.get(speechId).size();

        return avarageScore;
    }

}
