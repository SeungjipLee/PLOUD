package com.ssafy.ploud.domain.complain.service;

import com.ssafy.ploud.domain.complain.dto.ComplainResponse;
import com.ssafy.ploud.domain.complain.dto.ComplainUserRequestDto;
import java.util.List;

public interface ComplainService {

  public void complainUser(ComplainUserRequestDto requestDto);

  public List<ComplainResponse> findAll();

}
