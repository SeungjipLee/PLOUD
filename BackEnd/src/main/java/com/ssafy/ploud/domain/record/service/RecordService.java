package com.ssafy.ploud.domain.record.service;

import com.ssafy.ploud.domain.record.dto.request.RecordListRequest;
import com.ssafy.ploud.domain.record.dto.response.RecordDetailResponse;
import com.ssafy.ploud.domain.record.dto.response.RecordListResponse;
import com.ssafy.ploud.domain.record.dto.response.TotalScoreResponse;
import io.openvidu.java.client.Recording;

public interface RecordService {

    RecordDetailResponse getSpeechDetail(int speechId);

    RecordListResponse getSpeechList(RecordListRequest recordListRequest);

    String deleteVideo(int speechId);

    TotalScoreResponse getSpeechScore();
}
