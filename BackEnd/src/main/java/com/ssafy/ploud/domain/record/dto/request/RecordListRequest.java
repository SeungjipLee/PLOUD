package com.ssafy.ploud.domain.record.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class RecordListRequest {
    String userId;
    int pageSize;
}
