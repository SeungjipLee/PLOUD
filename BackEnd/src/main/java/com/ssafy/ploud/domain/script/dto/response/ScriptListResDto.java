package com.ssafy.ploud.domain.script.dto.response;

import java.util.List;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class ScriptListResDto {

  private int categoryId;
  private String categoryName;
  private List<ScriptInfoDto> scripts;

}
