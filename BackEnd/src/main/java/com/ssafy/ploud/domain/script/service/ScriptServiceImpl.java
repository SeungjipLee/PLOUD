package com.ssafy.ploud.domain.script.service;

import com.ssafy.ploud.domain.script.ScriptCategory;
import com.ssafy.ploud.domain.script.ScriptEntity;
import com.ssafy.ploud.domain.script.dto.response.ScriptInfoDto;
import com.ssafy.ploud.domain.script.repository.ScriptRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScriptServiceImpl implements ScriptService {

  private final ScriptRepository scriptRepository;

  @Override
  public List<ScriptInfoDto> getScriptListByCategory(ScriptCategory category) {
    List<ScriptEntity> scriptList = scriptRepository.findByCategory(category);
    List<ScriptInfoDto> res = new ArrayList<>();
    for (ScriptEntity entity : scriptList) {
      res.add(entity.toDto());
    }
    return res;
  }
}
