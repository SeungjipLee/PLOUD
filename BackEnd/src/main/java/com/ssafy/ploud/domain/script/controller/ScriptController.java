package com.ssafy.ploud.domain.script.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.common.response.ResponseCode;
import com.ssafy.ploud.domain.script.ScriptCategory;
import com.ssafy.ploud.domain.script.ScriptEntity;
import com.ssafy.ploud.domain.script.dto.response.ScriptCategoriesResDto;
import com.ssafy.ploud.domain.script.dto.response.ScriptDetailResDto;
import com.ssafy.ploud.domain.script.dto.response.ScriptListResDto;
import com.ssafy.ploud.domain.script.service.ScriptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "대본 관련 API")
@SecurityRequirement(name = "Bearer Authentication")
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

  @Operation(summary = "대본 목록 조회", description = "선택한 대본 카테고리에 해당하는 대본 조회")
  @GetMapping("/list/{categoryId}")
  public ApiResponse<ScriptListResDto> getAllScriptListByCategory(
      @PathVariable("categoryId") int categoryId) {

    if (ScriptCategory.fromCategoryId(categoryId) == null) {
      return ApiResponse.failure("categoryId에 해당하는 카테고리가 존재하지 않습니다", ResponseCode.NOT_FOUND);
    }
    String categoryName = ScriptCategory.fromCategoryId(categoryId).getCategoryName();
    ScriptListResDto res = new ScriptListResDto();
    res.setCategoryId(categoryId);
    res.setCategoryName(categoryName);
    res.setScripts(
        scriptService.getScriptListByCategory(ScriptCategory.fromCategoryId(categoryId)));

    return ApiResponse.ok("대본 리스트 조회 성공", res);
  }

  @Operation(summary = "대본 상세 조회", description = "scriptId번 대본 상세 정보 조회")
  @GetMapping("/{scriptId}")
  public ApiResponse<ScriptDetailResDto> getScriptDetailInfo(
      @PathVariable("scriptId") int scriptId) {
    try {
      return ApiResponse.ok("대본 상세 조회 성공", scriptService.getScriptDetailById(scriptId));
    } catch (Exception e) {
      return ApiResponse.failure("대본이 존재하지 않습니다", ResponseCode.NOT_FOUND);
    }
  }

}
