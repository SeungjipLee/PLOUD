package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.domain.board.dto.request.HeartRequest;
import java.util.Map;

public interface HeartService {

  Map<String, Integer> updateHeart(HeartRequest heartRequest, String userId);
}
