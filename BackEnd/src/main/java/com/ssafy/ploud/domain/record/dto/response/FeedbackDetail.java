package com.ssafy.ploud.domain.record.dto.response;

import java.sql.Time;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class FeedbackDetail {

  String content;
  Time timeLog;
}