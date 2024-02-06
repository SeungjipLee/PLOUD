package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import java.awt.print.Pageable;
import java.util.List;

public interface BoardService {

  List<BoardResponse> getAllBoards(Pageable pageable);

  void createBoard(BoardRequest boardRequest);

  BoardResponse getBoardById(int id);

  void updateBoard(int id, BoardRequest boardRequest);

  void deleteBoard(int id);

  void updateCount(BoardResponse board, boolean heart);

  
}
