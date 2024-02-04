package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;

public interface BoardService {

  void createBoard(BoardRequest boardRequest, String userId);

  BoardResponse getBoardById(int id);

  void updateBoard(int id, BoardRequest boardRequest);

  void deleteBoard(int id);

}
