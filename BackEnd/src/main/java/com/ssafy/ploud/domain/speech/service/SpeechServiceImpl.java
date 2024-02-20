package com.ssafy.ploud.domain.speech.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.S3.service.S3Service;
import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import com.ssafy.ploud.domain.meeting.util.OpenViduUtil;
import com.ssafy.ploud.domain.record.FeedbackEntity;
import com.ssafy.ploud.domain.record.ScoreEntity;
import com.ssafy.ploud.domain.record.VideoEntity;
import com.ssafy.ploud.domain.record.repository.FeedbackRepository;
import com.ssafy.ploud.domain.record.repository.ScoreRepository;
import com.ssafy.ploud.domain.record.repository.VideoRepository;
import com.ssafy.ploud.domain.script.ScriptEntity;
import com.ssafy.ploud.domain.script.repository.ScriptRepository;
import com.ssafy.ploud.domain.speech.SpeechEntity;
import com.ssafy.ploud.domain.speech.dto.ClearityDto;
import com.ssafy.ploud.domain.speech.dto.request.CommentRequest;
import com.ssafy.ploud.domain.speech.dto.request.FeedbackRequest;
import com.ssafy.ploud.domain.speech.dto.request.SpeechEndRequest;
import com.ssafy.ploud.domain.speech.dto.request.SpeechStartRequest;
import com.ssafy.ploud.domain.speech.dto.request.VideoUploadRequest;
import com.ssafy.ploud.domain.speech.dto.response.ClearityResponse;
import com.ssafy.ploud.domain.speech.repository.SpeechRepository;
import com.ssafy.ploud.domain.speech.util.EtriUtil;
import com.ssafy.ploud.domain.speech.util.FfmpegUtil;
import com.ssafy.ploud.domain.speech.util.SpeechAssessUtil;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class SpeechServiceImpl implements SpeechService {

    private final OpenViduUtil openViduUtil;
    private final FfmpegUtil ffmpegUtil;
    private final EtriUtil etriUtil;
    private final SpeechAssessUtil speechAssessUtil;

    private final UserRepository userRepository;
    private final SpeechRepository speechRepository;
    private final VideoRepository videoRepository;
    private final S3Service s3Service;
    private final ScoreRepository scoreRepository;
    private final FeedbackRepository feedbackRepository;
    private final ScriptRepository scriptRepository;

    private int cnt = 0;

    static {
        File audioDir = new File("/audio");

        if (!audioDir.exists()) {
            boolean created = audioDir.mkdirs();
        } else {
            File[] files = audioDir.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isFile()) {
                        file.delete();
                    }
                }
            }
        }
    }

    @Override
    @Transactional
    public Map<String, Integer> start(SpeechStartRequest speechStartRequest) {
        if (!speechStartRequest.isPersonal()) {
            if (openViduUtil.findSpeechIdBySessionId(speechStartRequest.getSessionId()) != -1) {
                throw new CustomException(ResponseCode.RECORD_PROCEEDING);
            }
        }

        // user 정보 가져오기
        UserEntity userEntity = userRepository.findByUserId(speechStartRequest.getUserId())
            .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        // 대본 가져오기
        ScriptEntity script = null;
        if (speechStartRequest.getScriptId() != 0) {
            script = scriptRepository.findById(speechStartRequest.getScriptId())
                .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND));
        }

        ScoreEntity score = new ScoreEntity();

        SpeechEntity speech = SpeechEntity.builder()
            .title(speechStartRequest.getTitle())
            .personal(speechStartRequest.isPersonal())
            .recordTime(LocalDateTime.now())
            .script(script)
            .score(score)
            .categoryId(speechStartRequest.getCategoryId())
            .build();

        speech.setUser(userEntity);

        int id = speechRepository.save(speech).getId();
        System.out.println("speech id; " + id);

        if(!speechStartRequest.isPersonal()){
            openViduUtil.findBySessionId(speechStartRequest.getSessionId()).setSpeechId(id);
        }

        Map<String, Integer> res = new HashMap<>();
        res.put("speechId",speech.getId());

        return res;
    }

    @Override
    @Transactional
    public void endAndDecibel(SpeechEndRequest speechEndRequest) {
        String sessionId = speechEndRequest.getSessionId();
        if (!sessionId.isEmpty()) {
            MeetingInfo meetingInfo = openViduUtil.findBySessionId(sessionId);
            meetingInfo.setSpeechId(-1);
        }

        // 데시벨 평가
        int volume = speechAssessUtil.decibels(speechEndRequest.getDecibels());
        SpeechEntity speech = speechRepository.findById(speechEndRequest.getSpeechId())
            .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND));
        speech.updateSpeechEndTime();
        speech.getScore().updateVolume(volume);

        // 사용자 연습 시간 업데이트
        UserEntity user = speech.getUser();
        user.updateUserPracticeTime(speech);
    }

    @Override
    @Transactional
    public void feedback(FeedbackRequest feedbackRequest) {
        log.info(feedbackRequest.getSessionId());
        int speechId = 0;
        if(feedbackRequest.getSessionId().isEmpty()){
            speechId = feedbackRequest.getSpeechId();
        }else{
            speechId = openViduUtil.findSpeechIdBySessionId(feedbackRequest.getSessionId());
        }
        log.info("SpeechServiceImpl feedback speechId; " + speechId);
        SpeechEntity speechEntity = speechRepository.findById(speechId)
            .orElseThrow(() -> new CustomException(ResponseCode.SPEECH_NOT_FOUND));
        // speechId, userId, content로 fb 등록
        feedbackRepository.save(FeedbackEntity.of(feedbackRequest, speechEntity));
    }

    @Override
    @Transactional
    public void comment(CommentRequest commentRequest) {
        int speechId = commentRequest.getSpeechId();

        SpeechEntity speechEntity = speechRepository.findById(speechId)
            .orElseThrow(() -> new CustomException(ResponseCode.SPEECH_NOT_FOUND));
        speechEntity.updateComment(commentRequest.getComment());
    }

    @Override
    public ClearityResponse clearity(MultipartFile audioFile, Integer speechId, Boolean isLast) {

        // 파일 경로
        String inputWavFile = "/audio/in_" + cnt + ".wav";
        String outputWavFile = "/audio/out_" + cnt++ + ".wav";

        File dest = null;
        try {
            dest = new File(inputWavFile);

            try (FileOutputStream fos = new FileOutputStream(dest)) {
                fos.write(audioFile.getBytes());
            }

            // 파일 변환
            ffmpegUtil.convertAudio(inputWavFile, outputWavFile);

            Map<String, Object> audioInfo = etriUtil.fileToBase64(outputWavFile);

            ClearityDto clearityDto = etriUtil.getScore(audioInfo);

            if(clearityDto != null){
                speechAssessUtil.addClearity(speechId, clearityDto);
                log.debug("스크립트 개수 확인 : " + clearityDto.getCnt() + ", 점수 확인 : " + clearityDto.getFloatScore());
            }else{
                log.debug("평가 점수 없음.");
            }

            if (isLast) {
                log.debug("스피치 전체 평가 시작스피치 아이디 : " + speechId);

                Map<String, Integer> scores = speechAssessUtil.assess(speechId);

                log.debug("스피치 전체 평가 완료");

                // 평가 등록하기
                SpeechEntity speechEntity = speechRepository.findById(speechId)
                    .orElseThrow(() -> new CustomException(ResponseCode.SPEECH_NOT_FOUND));

                log.debug("스피치 아이디 : " + speechEntity.getId());

                ScoreEntity score = speechEntity.getScore();
                score.updateClearity(scores.get("clearity"));
                score.updateSpeed(scores.get("speed"));
                scoreRepository.save(score);
                log.debug("스피치 평가 등록 완료, 스피치 아이디 : " + speechId + ", 명료도 : " + scores.get("clearity") + ", 속도 : " + scores.get("speed"));
            }

            if (clearityDto == null) {
                throw null;
            }
            return new ClearityResponse(clearityDto);
        } catch (Exception e) {
            return null;
        } finally {
            dest.delete();
        }
    }

    @Transactional
    public void uploadVideo(VideoUploadRequest reqdto, String userId) {
        SpeechEntity speech = speechRepository.findById(reqdto.getSpeechId())
            .orElseThrow(() -> new CustomException(ResponseCode.SPEECH_NOT_FOUND));

        String videoPath = s3Service.saveFile(reqdto.getVideo(), "speech", userId);

        VideoEntity video = VideoEntity.createEntity(videoPath, reqdto.getSpeechTimeInSeconds());
        speech.setVideo(video);
        videoRepository.save(video);
    }

    public Map<String, Long> findAllSpeechCount() {
        Map<String, Long> res = new HashMap<>();
        res.put("count", speechRepository.countAllSpeeches());
        return res;
    }
}
