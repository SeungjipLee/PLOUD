package com.ssafy.ploud.domain.record.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.record.FeedbackEntity;
import com.ssafy.ploud.domain.record.ScoreEntity;
import com.ssafy.ploud.domain.record.VideoEntity;
import com.ssafy.ploud.domain.record.dto.request.RecordListRequest;
import com.ssafy.ploud.domain.record.dto.response.FeedbackDetail;
import com.ssafy.ploud.domain.record.dto.response.RecordDetailResponse;
import com.ssafy.ploud.domain.record.dto.response.RecordListResponse;
import com.ssafy.ploud.domain.record.dto.response.ScoreDetail;
import com.ssafy.ploud.domain.record.dto.response.SpeechDetail;
import com.ssafy.ploud.domain.record.dto.response.TotalScoreResponse;
import com.ssafy.ploud.domain.record.dto.response.VideoDetail;
import com.ssafy.ploud.domain.record.repository.FeedbackRepository;
import com.ssafy.ploud.domain.record.repository.ScoreRepository;
import com.ssafy.ploud.domain.record.repository.VideoRepository;
import com.ssafy.ploud.domain.script.ScriptCategory;
import com.ssafy.ploud.domain.speech.SpeechCategory;
import com.ssafy.ploud.domain.speech.SpeechEntity;
import com.ssafy.ploud.domain.speech.repository.SpeechRepository;
import com.ssafy.ploud.domain.user.UserEntity;
import com.ssafy.ploud.domain.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService{

    private final SpeechRepository speechRepository;
    private final FeedbackRepository feedbackRepository;
    private final VideoRepository videoRepository;
    private final UserRepository userRepository;

    @Override
    public RecordDetailResponse getSpeechDetail(int speechId) {
        // speech 조회
        SpeechEntity speechEntity = speechRepository.findById(speechId)
            .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND));

        // video 조회(없어도 ok)
        VideoEntity video = speechEntity.getSpeechVideo();
        VideoDetail videoDetail = (video == null) ? null : video.toDto(video);

        // feedback list 조회
        List<FeedbackDetail> feedbackDetailList = new ArrayList<>();
        for (FeedbackEntity feedback : feedbackRepository.findBySpeechId(speechId)) {
            feedbackDetailList.add(FeedbackDetail.of(feedback));
        }

        return RecordDetailResponse.of(speechEntity, videoDetail, feedbackDetailList);
    }


    @Override
    public List<SpeechDetail> getSpeechList(String userId) {

        // DB에서 목록 조회
        List<SpeechEntity> speechList = speechRepository.findTop5ByUser_userIdOrderByRecordTimeDesc(
            userId);

        List<SpeechDetail> dtoList = new ArrayList<>();
        for(SpeechEntity entity:speechList) {
            dtoList.add(SpeechDetail.of(entity));
        }

        return dtoList;
    }

    @Override
    @Transactional
    public String deleteVideo(int speechId) {
        // Video Table에서 speechId에 해당하는 video path 가져오기
        SpeechEntity speech = speechRepository.findById(speechId)
            .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND));

        VideoEntity video = speech.getSpeechVideo();
        if(video==null) throw new CustomException(ResponseCode.NOT_FOUND); // 영상 정보가 없을 경우 Exception
        String videoPath = video.getVideoPath();

        // DB 삭제
        speech.setVideo(null);
        videoRepository.delete(video);

        // video path 반환
        return videoPath;
    }

    @Override
    public TotalScoreResponse getSpeechScore(String userId) {

        UserEntity user = userRepository.findByUserId(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        // userId 사용자가 했던 모든 speechId 찾기 -> speech entity 찾기
        List<SpeechEntity> speechList = speechRepository.findAllByUser_userIdOrderByRecordTimeAsc(
            userId);

        List<ScoreDetail> dtoList = new ArrayList<>();
        for (SpeechEntity speech : speechList) {
            ScoreEntity score = speech.getScore();
            dtoList.add(score.toDtoWithSpeechDate(speech.getRecordTime()));
        }

        return TotalScoreResponse.createResponse(
            user.getSoloDurationInMinute()+user.getStudyDurationInMinute(),
//            convertMinuteToString(user.getSoloDurationInMinute()),
//            convertMinuteToString(user.getStudyDurationInMinute()),
            dtoList);
    }

    private String convertMinuteToString(long minute) {
        return String.format("%2d시간 %2d분", minute / 60, minute % 60);
    }
}
