package com.ssafy.ploud.domain.speech.util;

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

    public static void convertAudio(String inputAudioPath, String outputAudioPath)
        throws Exception {
        log.debug("FFMPEG AudioConvert Start!");
        // ffmpeg build
        ProcessBuilder processBuilder = new ProcessBuilder(
            ffmpegPath,
            "-i", inputAudioPath,
            "-ar", "16000",
            "-ac", "1",
            outputAudioPath);

        Process process = processBuilder.start();

        if(process.waitFor() == 0){
            log.debug("FFMPEG AudioConvert Success!");
        }
        else {
            throw new Exception();
        }
    }
}
