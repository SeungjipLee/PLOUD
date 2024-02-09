package com.ssafy.ploud.domain.speech.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Data
@Getter
@Setter
public class VideoUploadRequest {
  private int speechId;
  private long speechTimeInSeconds;
  private MultipartFile video;
}
