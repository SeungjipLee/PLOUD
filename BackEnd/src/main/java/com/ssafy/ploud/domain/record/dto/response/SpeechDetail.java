package com.ssafy.ploud.domain.record.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
public class SpeechDetail {
  String title;
  int speechId;
  String userId;
  String speechMode;
  String startsAt; // ??? string?
  String comment;
}
