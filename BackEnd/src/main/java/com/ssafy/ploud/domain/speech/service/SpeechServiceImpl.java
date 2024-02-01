package com.ssafy.ploud.domain.speech.service;

import com.ssafy.ploud.domain.speech.dto.ClearityDto;
import com.ssafy.ploud.domain.speech.dto.request.CommentRequest;
import com.ssafy.ploud.domain.speech.dto.request.FeedbackRequest;
import com.ssafy.ploud.domain.speech.dto.request.SpeechEndRequest;
import com.ssafy.ploud.domain.speech.dto.request.SpeechStartRequest;
import com.ssafy.ploud.domain.speech.util.EtriUtil;
import com.ssafy.ploud.domain.speech.util.FfmpegUtil;
import java.io.File;
import java.io.FileOutputStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class SpeechServiceImpl implements SpeechService{
    private final FfmpegUtil ffmpegUtil;

    private final EtriUtil etriUtil;

    private int cnt = 0;

    @Override
    public int start(SpeechStartRequest speechStartRequest) {
        // 스터디 녹화인 경우
        // 현재 녹화중인 목록을 확인
        // sessionId - speechId가 존재하는지 확인
            // Speech Table 생성 및 SpeechId 반환

        // 개인 녹화인 경우
            // Speech Table 생성 후 SpeechId 반환

        return 0;
    }

    @Override
    public void endAndDecibel(SpeechEndRequest speechEndRequest) {
        // sessionId - speechId 삭제(메모리)

        // Decibel 평가 진행

        // 평가 등록
    }

    @Override
    public void feedback(FeedbackRequest feedbackRequest) {
        // sessionId로 speechId 조회

        // speechId, userId, content로 fb 등록
    }

    @Override
    public void comment(CommentRequest commentRequest) {
        // speechId에 comment 등록
    }

    @Override
    public float clearity(MultipartFile audioFile, Integer speechId, Boolean isLast) {
        // 파일 경로
        String inputWavFile = "D:\\path\\to\\your\\upload\\directory\\in_" + cnt + ".wav";
        String outputWavFile = "D:\\path\\to\\your\\upload\\directory\\out_" + cnt++ + ".wav";

        File dest = null;
        try {
            // 파일로 저장
            dest = new File(inputWavFile);
            try (FileOutputStream fos = new FileOutputStream(dest)) {
                fos.write(audioFile.getBytes());
            }

            // 파일 변환
            ffmpegUtil.convertAudio(inputWavFile, outputWavFile);

            String audioContent = etriUtil.fileToBase64(outputWavFile);

            ClearityDto clearityDto = etriUtil.getScore(audioContent);

            // clearityDto 값을 speechId 값을 key로 임시 저장해야함.
//            speechId

            // isLast일 경우 평가 종합 진행
//            if(isLast){}

            return clearityDto.getFloatScore();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        } finally {
            dest.delete();
        }
    }
}
