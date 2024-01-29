package com.ssafy.ploud.domain.script.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.script.ScriptEntity;
import com.ssafy.ploud.domain.script.dto.response.ScriptCategoriesResDto;
import com.ssafy.ploud.domain.script.service.ScriptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "대본 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/script/")
public class ScriptController {

  private final ScriptService scriptService;

  @Operation(summary = "모든 대본 카테고리 조회")
  @GetMapping("/list")
  public ApiResponse<List<ScriptCategoriesResDto>> getAllScriptCategories() {
     return ApiResponse.ok("모든 대본 카테고리 조회 성공", ScriptEntity.getAllScriptCategory());
  }

}
