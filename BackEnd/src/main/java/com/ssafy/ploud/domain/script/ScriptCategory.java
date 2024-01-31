package com.ssafy.ploud.domain.script;

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
        .orElse(null);
  }

  public static ScriptCategory fromCategoryId(int categoryId) {
    return Arrays.stream(values())
        .filter(category -> category.getCategoryId() == categoryId)
        .findFirst()
        .orElse(null);
  }

}
