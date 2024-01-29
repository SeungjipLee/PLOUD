package com.ssafy.ploud.domain.script;

import lombok.Getter;

@Getter
public enum ScriptCategory {
  NEWS("뉴스"),
  SPEECH("발표");

  private final String categoryName;

  ScriptCategory(String categoryName) {
    this.categoryName = categoryName;
  }

}
