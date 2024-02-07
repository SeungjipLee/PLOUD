package com.ssafy.ploud.domain.speech.util;

import jakarta.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
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

    public static void convertAudio(String inputAudioPath, String outputAudioPath)
        throws Exception {

        log.debug("---------- FFMPEG AudioConvert Start! ----------");

        // ffmpeg build
        ProcessBuilder processBuilder = new ProcessBuilder(
            ffmpegPath,
            "-i", inputAudioPath,
            "-ar", "16000",
            "-ac", "1",
            outputAudioPath);

        Process process = processBuilder.start();

        int exitValue = process.waitFor();

        if(exitValue == 0){
            log.debug("---------- FFMPEG AudioConvert Success! ----------");
        }
        else {
            log.debug("---------- FFMPEG AudioConvert Error Log End! ----------");

            try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getErrorStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    log.debug(line); // 오류 메시지 로깅
                }
            } catch (IOException e) {
                e.printStackTrace(); // 오류 스트림 읽기 실패 처리
            }
            log.debug("---------- FFMPEG AudioConvert Error Log End! ----------");
            throw new Exception();
        }
    }
}
