package com.ssafy.ploud.domain.board.service;

import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.dto.response.BoardResponse;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {

  Page<BoardResponse> getAllBoards(Pageable pageable);

  void createBoard(BoardRequest boardRequest, String userId);

  BoardResponse getBoardById(int id);

  void updateBoard(int id, BoardRequest boardRequest);

  void deleteBoard(int id);

  void updateCount(BoardResponse board, boolean heart);

  
}
