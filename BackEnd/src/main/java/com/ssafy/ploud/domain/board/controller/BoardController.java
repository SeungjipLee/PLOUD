package com.ssafy.ploud.domain.board.controller;

import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.domain.board.dto.request.BoardRequest;
import com.ssafy.ploud.domain.board.service.BoardService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/create")
    public ApiResponse<?> createBoard(@RequestBody BoardRequest boardRequest){
        boardService.createBoard(boardRequest, boardRequest.getUserId());
        return ApiResponse.ok("글쓰기 성공");
    }
}
