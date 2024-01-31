package com.ssafy.ploud.domain.speech;

public enum SpeechCategory {

  PRESENTATION("발표"),
  INTERVIEW("면접");

  private final String categoryName;

  SpeechCategory(String categoryName) {
    this.categoryName = categoryName;
  }

  public String getCategoryName() {
    return categoryName;
  }

}
