package com.ssafy.ploud.domain.script;

import com.ssafy.ploud.domain.script.dto.response.ScriptCategoriesResDto;
import com.ssafy.ploud.domain.script.dto.response.ScriptInfoDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Entity
@Getter
@Table(name="scripts")
public class ScriptEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id; // 대본 번호

  @Enumerated(EnumType.STRING)
  private ScriptCategory category; // 대본 카테고리

  private String title; // 대본 제목

  @Column(columnDefinition = "LONGTEXT")
  private String content; // 대본 내용

  private String originalVideo; // 원본 영상

  public static List<ScriptCategoriesResDto> getAllScriptCategory() {
    return Arrays.stream(ScriptCategory.values())
        .map(category -> new ScriptCategoriesResDto(category.getCategoryId(),
            category.getCategoryName()))
        .collect(Collectors.toList());
  }

  public ScriptInfoDto toDto() {
    return ScriptInfoDto.builder()
        .scriptId(this.getId())
        .scriptTitle(this.getTitle())
        .build();
  }

}
