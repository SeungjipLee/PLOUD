package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.domain.board.dto.request.BoardRequest;

public interface BoardService {
    void createBoard(BoardRequest boardRequest, String userId);


}
