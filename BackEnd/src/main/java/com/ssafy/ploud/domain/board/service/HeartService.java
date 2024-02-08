package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.domain.board.dto.request.HeartRequest;

public interface HeartService {

  void insert(HeartRequest heartRequest, String userId);

  void delete(HeartRequest heartRequest, String userId);
}
