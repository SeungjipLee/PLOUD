package com.ssafy.ploud.domain.record.service;

import com.ssafy.ploud.domain.record.dto.request.RecordListRequest;
import com.ssafy.ploud.domain.record.dto.response.RecordDetailResponse;
import com.ssafy.ploud.domain.record.dto.response.RecordListResponse;
import com.ssafy.ploud.domain.record.dto.response.SpeechDetail;
import com.ssafy.ploud.domain.record.dto.response.TotalScoreResponse;
import java.util.List;

public interface RecordService {

    RecordDetailResponse getSpeechDetail(int speechId); // 스피치 결과 조회

    List<SpeechDetail> getSpeechList(String userId); // 스피치 결과 목록

    String deleteVideo(int speechId); // 영상 삭제

    TotalScoreResponse getSpeechScore(); // 마이페이지 스피치 통계 조회
}
