package com.ssafy.ploud.domain.board.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
public class BoardRequest {
    private int id;
    private String userId;
    private String title;
    private String content;
    private MultipartFile videoPath;
}
