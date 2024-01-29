package com.ssafy.ploud.domain.script.repository;

import com.ssafy.ploud.domain.script.ScriptCategory;
import com.ssafy.ploud.domain.script.ScriptEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScriptRepository extends JpaRepository<ScriptEntity, Integer> {

  List<ScriptEntity> findByCategory(ScriptCategory category);

}
