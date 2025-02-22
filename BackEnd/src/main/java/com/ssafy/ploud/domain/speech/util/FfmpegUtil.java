package com.ssafy.ploud.domain.speech.util;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class FfmpegUtil {

    private static String ffmpegPath;

    @Value("${ffmpeg.filepath}")
    public void setFfmpegPath(String ffmpegPath){
        this.ffmpegPath = ffmpegPath;
    }

//    @PostConstruct
//    private void init(@Value("${ffmpeg.filepath}") String ffmpegPath){
//        this.ffmpegPath = ffmpegPath;
//    }

    // 음성 파일을 API 요청 보내기 위해 적합한 포맷으로 변환하는 함수
    public static void convertAudio(String inputAudioPath, String outputAudioPath)
        throws Exception {
        // ffmpeg build
        ProcessBuilder processBuilder = new ProcessBuilder(
            ffmpegPath,
            "-i", inputAudioPath,
            "-ar", "16000",
            "-ac", "1",
            outputAudioPath);

        Process process = processBuilder.start();

        if(process.waitFor() != 0){
            throw new CustomException(ResponseCode.ETRI_ERROR);
        }
    }
}
