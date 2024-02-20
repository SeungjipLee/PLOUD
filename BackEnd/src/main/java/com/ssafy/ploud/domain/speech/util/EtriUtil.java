package com.ssafy.ploud.domain.speech.util;

import com.google.gson.Gson;
import com.ssafy.ploud.domain.speech.dto.ClearityDto;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class EtriUtil {
    private static String pronApiURL;
    private static String accessKey;
    private static String languageCode;

    @Value("${erti.pronapi.url}")
    public void setPronApiURL(String pronApiURL){
        this.pronApiURL = pronApiURL;
    }
    @Value("${erti.accesskey}")
    public void setAccessKey(String accessKey){
        this.accessKey = accessKey;
    }
    @Value("${etri.languagecode}")
    public void setLanguageCode(String languageCode){
        this.languageCode = languageCode;
    }


    // API 요청을 보내는 함수
    public static ClearityDto getScore(Map<String, Object> audioInfo){
        Gson gson = new Gson();

        Map<String, Object> request = new HashMap<>();
        Map<String, String> argument = new HashMap<>();

        argument.put("language_code", languageCode);
        argument.put("audio", (String) audioInfo.get("audioContents"));
        request.put("argument", argument);

        URL url;
        Integer responseCode = null;
        String responBody = null;

        try{
            url = new URL(pronApiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");
            con.setDoOutput(true);
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setRequestProperty("Authorization", accessKey);
            con.setConnectTimeout(5000);

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(gson.toJson(request).getBytes("UTF-8"));
            wr.flush();
            wr.close();

            responseCode = con.getResponseCode();
            // JSON 파싱 후 response 객체에 담아서 return
            if(responseCode.equals(200)){
                InputStream is = con.getInputStream();
                byte[] buffer = new byte[is.available()];
                int byteRead = is.read(buffer);
                responBody = new String(buffer);

                System.out.println(responBody);

                JSONObject obj = new JSONObject(responBody);
                JSONObject returnObject = obj.getJSONObject("return_object");

                String recognized = returnObject.getString("recognized");
                String score = returnObject.getString("score");

                int scriptCnt = countKoreanCharacters(recognized);

                double doubleScore;

                try {
                    doubleScore = Double.parseDouble(score);
                } catch (Exception e) {
                    doubleScore = 0;
                }

                if(doubleScore == 0 ){
                    return null;
                }
                return new ClearityDto(recognized, scriptCnt, doubleScore, (double) audioInfo.get("audioTime"));
            }else{
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Script의 분당 음절 수 구하기
    public static int countKoreanCharacters(String text) {
        // 한글 정규식
        String koreanRegex = "[가-힣]";
        Pattern koreanPattern = Pattern.compile(koreanRegex);
        Matcher koreanMatcher = koreanPattern.matcher(text);

        // 영어 정규식
        String englishRegex = "[a-zA-Z]";
        Pattern englishPattern = Pattern.compile(englishRegex);
        Matcher englishMatcher = englishPattern.matcher(text);

        // 숫자 정규식
        String numericRegex = "\\d";
        Pattern numericPattern = Pattern.compile(numericRegex);
        Matcher numericMatcher = numericPattern.matcher(text);

        int koreanCount = 0;
        while (koreanMatcher.find()) {
            koreanCount++;
        }

        int englishCount = 0;
        while(englishMatcher.find()){
            englishCount++;
        }

        int numericCount = 0;
        while(numericMatcher.find()){
            numericCount++;
        }

        // 한글의 경우 1 : 1
        // 영어의 경우 평균 2.5 ~ 3.5 : 1
        // 숫자의 경우 평균 2 ~ 3 : 1
        int totalCount = koreanCount + (int)(englishCount / 3) + (int)(numericCount / 2);

        return totalCount;
    }

    // AudioFile을 API 요청을 위해 Base64로 인코딩하는 함수
    public static Map<String, Object> fileToBase64(String outputWavFile) throws UnsupportedAudioFileException, IOException {
        AudioInputStream audioInputStream = null;
        File outputFile = null;

        String audioContents = null;
        double audioTime = 0;
        try {
            outputFile = new File(outputWavFile);
            AudioInputStream stereoInputStream = AudioSystem.getAudioInputStream(outputFile);

            AudioFormat format = stereoInputStream.getFormat();
            AudioFormat monoFormat = new AudioFormat(format.getSampleRate(), 16, 1, true, false);

            audioInputStream = AudioSystem.getAudioInputStream(monoFormat,
                stereoInputStream);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = audioInputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, bytesRead);
            }

            byte[] audioBytes = byteArrayOutputStream.toByteArray();

            double total_samples = (double) audioBytes.length / 2;
            audioTime = total_samples / 16000;

            audioContents = Base64.getEncoder().encodeToString(audioBytes);
        } finally {
            audioInputStream.close();
            outputFile.delete();
        }

        Map<String, Object> map = new HashMap<>();
        map.put("audioContents", audioContents);
        map.put("audioTime", audioTime);

        return map;
    }
}


