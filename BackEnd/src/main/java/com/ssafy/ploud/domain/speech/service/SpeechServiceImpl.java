package com.ssafy.ploud.domain.speech.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.meeting.dto.MeetingInfo;
import com.ssafy.ploud.domain.meeting.util.OpenViduUtil;
import com.ssafy.ploud.domain.record.FeedbackEntity;
import com.ssafy.ploud.domain.record.repository.FeedbackRepository;
import com.ssafy.ploud.domain.record.repository.ScoreRepository;
import com.ssafy.ploud.domain.record.repository.VideoRepository;
import com.ssafy.ploud.domain.script.ScriptEntity;
import com.ssafy.ploud.domain.script.repository.ScriptRepository;
import com.ssafy.ploud.domain.speech.CategoryEntity;
import com.ssafy.ploud.domain.speech.SpeechEntity;
import com.ssafy.ploud.domain.speech.dto.ClearityDto;
import com.ssafy.ploud.domain.speech.dto.request.CommentRequest;
import com.ssafy.ploud.domain.speech.dto.request.FeedbackRequest;
import com.ssafy.ploud.domain.speech.dto.request.SpeechEndRequest;
import com.ssafy.ploud.domain.speech.dto.request.SpeechStartRequest;
import com.ssafy.ploud.domain.speech.repository.SpeechRepository;
import com.ssafy.ploud.domain.speech.util.EtriUtil;
import com.ssafy.ploud.domain.speech.util.FfmpegUtil;
import com.ssafy.ploud.domain.speech.util.SpeechAssessUtil;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
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

    @Override
    @Transactional
    public int start(SpeechStartRequest speechStartRequest) {
        if (speechStartRequest.isPersonal()) {
            if (openViduUtil.findSpeechIdBySessionId(speechStartRequest.getSessionId()) != -1) {
                throw new CustomException(ResponseCode.RECORD_PROCEEDING);
            }
        }
        // user 정보 가져오기
        UserEntity userEntity = userRepository.findByUserId(speechStartRequest.getUserId())
            .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        // 대본 가져오기
        ScriptEntity script = null;
        if (speechStartRequest.getScriptId() != -1) {
            script = scriptRepository.findById(speechStartRequest.getScriptId())
                .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND));
        }

        SpeechEntity speech = SpeechEntity.builder()
            .title(speechStartRequest.getTitle())
            .personal(speechStartRequest.isPersonal())
            .recordTime(LocalDateTime.now())
            .script(script)
            // category
            .build();

        speech.setUser(userEntity);

        speechRepository.save(speech);

        return speech.getId();
    }

    @Override
    public void endAndDecibel(SpeechEndRequest speechEndRequest) {
        String sessionId = speechEndRequest.getSessionId();
        if(!sessionId.isEmpty()){
            MeetingInfo meetingInfo = openViduUtil.findBySessionId(sessionId);
            meetingInfo.setSpeechId(-1);
        }

        // 데시벨 평가
        int volume = speechAssessUtil.decibels(speechEndRequest.getDecibels());

//        scoreRepository.updateVolume(volume);
    }

    @Override
    public void feedback(FeedbackRequest feedbackRequest) {
        int speechId = openViduUtil.findSpeechIdBySessionId(feedbackRequest.getSessionId());
        log.info("SpeechServiceImpl feedback speechId; "+speechId);
        SpeechEntity speechEntity = speechRepository.findById(speechId)
            .orElseThrow(() -> new CustomException(ResponseCode.BAD_REQUEST));
        // speechId, userId, content로 fb 등록

        FeedbackEntity feedbackEntity = FeedbackEntity.createNewFeedback(feedbackRequest.getUserId(), feedbackRequest.getContent(), speechEntity);
        feedbackEntity.setSpeech(speechEntity);

        feedbackRepository.save(feedbackEntity);
    }

    @Override
    @Transactional
    public void comment(CommentRequest commentRequest) {
        int speechId = commentRequest.getSpeechId();

        SpeechEntity speechEntity = speechRepository.findById(speechId)
            .orElseThrow(()-> new CustomException(ResponseCode.BAD_REQUEST));
        speechEntity.updateComment(commentRequest.getComment());
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

            speechAssessUtil.addClearity(speechId, clearityDto);

            if(isLast){
                Map<String, Integer> scores = speechAssessUtil.assess(speechId);

                // 평가 등록하기
                // scoreRepository.updateClearity(scores.get("clearity"));
                // scoreRepository.updateSpeed(scores.get("speed"));
            }
            if(clearityDto != null){
                throw new CustomException(ResponseCode.ETRI_ERROR);
            }
            return clearityDto.getFloatScore();
        } catch (Exception e) {
            throw new CustomException(ResponseCode.FILE_CONVERT_ERROR);
        } finally {
            dest.delete();
        }
    }
}
