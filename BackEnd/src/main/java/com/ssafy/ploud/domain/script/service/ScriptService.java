package com.ssafy.ploud.domain.script.service;

import com.ssafy.ploud.domain.script.ScriptCategory;
import com.ssafy.ploud.domain.script.dto.response.ScriptInfoDto;
import java.util.List;

public interface ScriptService {

  public List<ScriptInfoDto> getScriptListByCategory(ScriptCategory category);

}
