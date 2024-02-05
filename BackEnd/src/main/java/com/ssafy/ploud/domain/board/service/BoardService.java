package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import java.util.List;

public interface BoardService {

  List<BoardResponse> getAllBoards();

  void createBoard(BoardRequest boardRequest, String userId);

  BoardResponse getBoardById(int id);

  void updateBoard(int id, BoardRequest boardRequest);

  void deleteBoard(int id);

  void updateCount(BoardResponse board, boolean heart);
}
