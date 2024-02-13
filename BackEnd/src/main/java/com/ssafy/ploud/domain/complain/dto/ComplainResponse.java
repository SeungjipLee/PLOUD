package com.ssafy.ploud.domain.complain.dto;

import com.ssafy.ploud.domain.complain.ComplainEntity;
import java.time.format.DateTimeFormatter;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ComplainResponse {

  private int id; // 신고 번호
  private String userId; // 신고 대상자 아이디
  private int complainCnt; // 신고 대상자의 누적횟수
  private String complainTime; // 신고 시간
  private String restriction; // 신고 처리 여부

  public static ComplainResponse of(ComplainEntity entity) {
    return ComplainResponse.builder()
        .id(entity.getId())
        .userId(entity.getUser().getUserId())
        .complainCnt(entity.getUser().getComplainCount())
        .complainTime(entity.getComplainTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
        .restriction(entity.isRestriction() ? "처리완료" : "미완료")
        .build();
  }

}
