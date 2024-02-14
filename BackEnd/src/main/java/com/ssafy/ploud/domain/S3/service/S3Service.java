package com.ssafy.ploud.domain.S3.service;

import com.ssafy.ploud.common.response.ApiResponse;
import org.springframework.web.multipart.MultipartFile;

public interface S3Service {

  String saveFile(MultipartFile multipartFile, String dir, String userId);
}
