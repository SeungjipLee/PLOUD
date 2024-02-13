package com.ssafy.ploud.domain.script;

import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ResponseCode;
import java.util.Arrays;
import lombok.Getter;

@Getter
public enum ScriptCategory {
  NEWS("뉴스", 1),
  SPEECH("발표", 2);

  private final String categoryName;
  private final int categoryId;

  ScriptCategory(String categoryName, int categoryId) {
    this.categoryName = categoryName;
    this.categoryId = categoryId;
  }

  public static ScriptCategory fromDisplayName(String categoryName) {
    return Arrays.stream(values())
        .filter(category -> category.getCategoryName().equals(categoryName))
        .findFirst()
        .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND));
  }

  public static ScriptCategory fromCategoryId(int categoryId) {
    return Arrays.stream(values())
        .filter(category -> category.getCategoryId() == categoryId)
        .findFirst()
        .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND));
  }

}
