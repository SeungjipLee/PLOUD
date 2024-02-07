package com.ssafy.ploud.domain.speech.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import com.ssafy.ploud.domain.meeting.util.OpenViduUtil;
import com.ssafy.ploud.domain.record.FeedbackEntity;
import com.ssafy.ploud.domain.record.ScoreEntity;
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
import com.ssafy.ploud.domain.speech.dto.response.ClearityResponse;
import com.ssafy.ploud.domain.speech.repository.SpeechRepository;
import com.ssafy.ploud.domain.speech.util.EtriUtil;
import com.ssafy.ploud.domain.speech.util.FfmpegUtil;
import com.ssafy.ploud.domain.speech.util.SpeechAssessUtil;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class SpeechServiceImpl implements SpeechService{
    private final OpenViduUtil openViduUtil;
    private final FfmpegUtil ffmpegUtil;
    private final EtriUtil etriUtil;
    private final SpeechAssessUtil speechAssessUtil;

    private final UserRepository userRepository;
    private final SpeechRepository speechRepository;
    private final VideoRepository videoRepository;
    private final ScoreRepository scoreRepository;
    private final FeedbackRepository feedbackRepository;
    private final ScriptRepository scriptRepository;

    private int cnt = 0;

    static {
        File audioDir = new File("audio");

        if (!audioDir.exists()) {
            boolean created = audioDir.mkdirs();
        }
    }

    @Override
    @Transactional
    public int start(SpeechStartRequest speechStartRequest) {
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
        System.out.println("speech id; "+id);
        openViduUtil.findBySessionId(speechStartRequest.getSessionId()).setSpeechId(id);

        return speech.getId();
    }

    @Override
    @Transactional
    public void endAndDecibel(SpeechEndRequest speechEndRequest) {
        String sessionId = speechEndRequest.getSessionId();
        if(!sessionId.isEmpty()){
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
        updateUserPracticeTime(speech);
    }

    private void updateUserPracticeTime(SpeechEntity speech) {
        UserEntity user = speech.getUser();
        Duration duration = Duration.between(speech.getRecordTime(), speech.getSpeechEndTime());
        long practiceTimeInMinute = duration.toMinutes();
        if(speech.isPersonal()) {
            user.updateSoloDuration(practiceTimeInMinute);
        } else {
            user.updateStudyDuration(practiceTimeInMinute);
        }
    }

    @Override
    @Transactional
    public void feedback(FeedbackRequest feedbackRequest) {
        log.info(feedbackRequest.getSessionId());
        int speechId = openViduUtil.findSpeechIdBySessionId(feedbackRequest.getSessionId());
        log.info("SpeechServiceImpl feedback speechId; "+speechId);
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
            .orElseThrow(()-> new CustomException(ResponseCode.SPEECH_NOT_FOUND));
        speechEntity.updateComment(commentRequest.getComment());
    }

    @Override
    public ClearityResponse clearity(MultipartFile audioFile, Integer speechId, Boolean isLast) {

        // 파일 경로
        String inputWavFile = "audio\\in_" + cnt + ".wav";
        String outputWavFile = "audio\\out_" + cnt++ + ".wav";

        File dest = null;
        try {
            // 파일로 저장
            dest = new File(inputWavFile);
            try (FileOutputStream fos = new FileOutputStream(dest)) {
                fos.write(audioFile.getBytes());
            }

            log.debug("명료도 평가 - 1 : InputFile 저장 성공");

            // 파일 변환
            ffmpegUtil.convertAudio(inputWavFile, outputWavFile);

            log.debug("명료도 평가 - 2 : 파일 변환 성공 InputFile -> OutputFile");

            Map<String, Object> audioInfo = etriUtil.fileToBase64(outputWavFile);

            log.debug("명료도 평가 - 3 : OutputFile BASE64 Encoding");

            ClearityDto clearityDto = etriUtil.getScore(audioInfo);

            log.debug("명료도 평가 - 4 : ETRI 점수 받아옴");

            speechAssessUtil.addClearity(speechId, clearityDto);

            if(isLast){
                Map<String, Integer> scores = speechAssessUtil.assess(speechId);

                // 평가 등록하기
                SpeechEntity speechEntity = speechRepository.findById(speechId)
                    .orElseThrow(() -> new CustomException(ResponseCode.SPEECH_NOT_FOUND));
                ScoreEntity score = speechEntity.getScore();
                score.updateClearity(scores.get("clearity"));
                score.updateSpeed(scores.get("speed"));
                scoreRepository.save(score);

                log.debug("명료도 평가 - 5 : 평가 DB에 저장");
            }
            if(clearityDto == null){
                throw new CustomException(ResponseCode.ETRI_ERROR);
            }

            return new ClearityResponse(clearityDto);
        } catch (Exception e) {
            throw new CustomException(ResponseCode.FILE_CONVERT_ERROR);
        } finally {
            dest.delete();
        }
    }
}
