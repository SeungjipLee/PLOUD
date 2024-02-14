package com.ssafy.ploud.domain.record.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class VideoDetail {

  String videoPath;
  long playTime;


}
