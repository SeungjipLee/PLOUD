package com.ssafy.ploud.domain.record.dto.response;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class RecordListResponse {

  List<SpeechDetail> speeches;

}
