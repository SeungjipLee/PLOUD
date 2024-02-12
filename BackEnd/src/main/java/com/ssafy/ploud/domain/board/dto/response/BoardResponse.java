package com.ssafy.ploud.domain.board.dto.response;

import com.ssafy.ploud.domain.board.BoardEntity;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class BoardResponse {

  private int id;
  private String nickname;
  private String profileImg;
  private String title;
  private String content;
  private String videoPath;
  private String registerTime;
  private int likeCount;
  private boolean isLiked;

  public static BoardResponse fromEntity(BoardEntity boardEntity, Map<String, String> userInfo,
      boolean isLiked) {
    return BoardResponse.builder()
        .id(boardEntity.getId())
        .nickname(userInfo.get("nickname"))
        .profileImg(userInfo.get("profileImg"))
        .title(boardEntity.getTitle())
        .content(boardEntity.getContent())
        .videoPath(boardEntity.getVideoPath())
        .registerTime(
            boardEntity.getRegisterTime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm")))
        .likeCount(boardEntity.getLikeCount())
        .isLiked(isLiked)
        .build();
  }
  
}
