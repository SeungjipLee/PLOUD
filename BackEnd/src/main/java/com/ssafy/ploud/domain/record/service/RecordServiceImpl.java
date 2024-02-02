package com.ssafy.ploud.domain.record.service;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.record.FeedbackEntity;
import com.ssafy.ploud.domain.record.VideoEntity;
import com.ssafy.ploud.domain.record.dto.request.RecordListRequest;
import com.ssafy.ploud.domain.record.dto.response.FeedbackDetail;
import com.ssafy.ploud.domain.record.dto.response.RecordDetailResponse;
import com.ssafy.ploud.domain.record.dto.response.RecordListResponse;
import com.ssafy.ploud.domain.record.dto.response.SpeechDetail;
import com.ssafy.ploud.domain.record.dto.response.TotalScoreResponse;
import com.ssafy.ploud.domain.record.dto.response.VideoDetail;
import com.ssafy.ploud.domain.record.repository.FeedbackRepository;
import com.ssafy.ploud.domain.record.repository.ScoreRepository;
import com.ssafy.ploud.domain.record.repository.VideoRepository;
import com.ssafy.ploud.domain.speech.SpeechEntity;
import com.ssafy.ploud.domain.speech.repository.SpeechRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService{

    private final SpeechRepository speechRepository;
    private final FeedbackRepository feedbackRepository;
    private final ScoreRepository scoreRepository;
    private final VideoRepository videoRepository;

    @Override
    public RecordDetailResponse getSpeechDetail(int speechId) {
        // speech 조회
        SpeechEntity speechEntity = speechRepository.findById(speechId)
            .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND));

        // video 조회(없어도 ok)
        VideoEntity video = speechEntity.getSpeechVideo();
        VideoDetail videoDetail = (video == null) ? null : video.toDto();

        List<FeedbackDetail> feedbackDetailList = new ArrayList<>();
        for (FeedbackEntity feedback : feedbackRepository.findBySpeechId(speechId)) {
            feedbackDetailList.add(feedback.toDto());
        }

        return RecordDetailResponse.builder()
            .speech(speechEntity.toDto())
            .video(videoDetail)
            .score(speechEntity.getScore().toDto())
            .feedbacks(feedbackDetailList)
            .build();
    }


    @Override
    public RecordListResponse getSpeechList(RecordListRequest recordListRequest) {

        // DB에서 목록 조회

        // pgno, size에 맞게 조회

        return null;
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
    public TotalScoreResponse getSpeechScore() {

        // 음... score db에서 조회해서

        // 가공 후에 반환하기

        return null;
    }
}
