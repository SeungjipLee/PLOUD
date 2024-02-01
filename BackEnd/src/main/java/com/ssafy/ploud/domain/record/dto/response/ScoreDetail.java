package com.ssafy.ploud.domain.record.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
public class ScoreDetail {

  int volume;
  int speed;
  int clarity;
  int eye;
  int grade;

}
