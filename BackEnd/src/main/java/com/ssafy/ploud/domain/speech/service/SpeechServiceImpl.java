package com.ssafy.ploud.domain.speech.service;

import com.ssafy.ploud.domain.speech.dto.response.ClearityResponse;
import com.ssafy.ploud.domain.speech.util.EtriUtil;
import com.ssafy.ploud.domain.speech.util.FfmpegUtil;
import java.io.File;
import java.io.FileOutputStream;
import javax.sound.sampled.AudioInputStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class SpeechServiceImpl implements SpeechService{

    @Autowired
    private FfmpegUtil ffmpegUtil;

    @Autowired
    private EtriUtil etriUtil;

    private int cnt = 0;

    @Override
    public ClearityResponse clearityRating(MultipartFile audioFile) {
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

            String audioContent = EtriUtil.fileToBase64(outputWavFile);

            // api 요청
            return EtriUtil.getScore(audioContent);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            dest.delete();
        }
    }
}
