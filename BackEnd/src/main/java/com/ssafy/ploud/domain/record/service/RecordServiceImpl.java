package com.ssafy.ploud.domain.record.service;

import com.ssafy.ploud.domain.meeting.util.OpenViduUtil;
import com.ssafy.ploud.domain.record.dto.request.RecordListRequest;
import com.ssafy.ploud.domain.record.dto.response.RecordDetailResponse;
import com.ssafy.ploud.domain.record.dto.response.RecordListResponse;
import com.ssafy.ploud.domain.record.dto.response.TotalScoreResponse;
import io.openvidu.java.client.Recording;
import io.openvidu.java.client.RecordingProperties;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class RecordServiceImpl implements RecordService{

    @Override
    public RecordDetailResponse getSpeechDetail(int speechId) {
        RecordDetailResponse recordDetailResponse = new RecordDetailResponse();
        // speech 조회
        // recordDetailResponse.setSpeech(조회);

        // video 조회(없어도 ok)

        // score 조회

        // feedback 조회(스터디인 경우만)

        return recordDetailResponse;
    }

    @Override
    public RecordListResponse getSpeechList(RecordListRequest recordListRequest) {

        // DB에서 목록 조회

        // pgno, size에 맞게 조회

        return null;
    }

    @Override
    public String deleteVideo(int speechId) {
        // Video Table에서 speechId에 해당하는 video path 가져오기

        // DB 삭제

        // 영상 정보가 없을 경우 Exception

        // video path 반환

        return "video_path";
    }

    @Override
    public TotalScoreResponse getSpeechScore() {

        // 음... score db에서 조회해서

        // 가공 후에 반환하기

        return null;
    }
}
