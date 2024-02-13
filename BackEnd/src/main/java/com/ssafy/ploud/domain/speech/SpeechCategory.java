package com.ssafy.ploud.domain.speech;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.script.ScriptCategory;
import java.util.Arrays;
import lombok.Getter;

@Getter
public enum SpeechCategory {
  /*
  * 0 전체
1 면접
2 발표
3 기타
  * */
  ALL("전체",0),
  INTERVIEW("면접",1),
  SPEECH("발표",2),
  ETC("기타",3);

  private final String categoryName;
  private final int categoryId;

  SpeechCategory(String categoryName, int categoryId) {
    this.categoryName = categoryName;
    this.categoryId = categoryId;
  }

  public static SpeechCategory fromDisplayName(String categoryName) {
    return Arrays.stream(values())
        .filter(category -> category.getCategoryName().equals(categoryName))
        .findFirst()
        .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND));
  }

  public static SpeechCategory fromCategoryId(int categoryId) {
    return Arrays.stream(values())
        .filter(category -> category.getCategoryId() == categoryId)
        .findFirst()
        .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND));
  }



}
