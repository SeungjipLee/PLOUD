package com.ssafy.ploud.domain.S3.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.ploud.common.exception.CustomException;
import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.common.response.ResponseCode;
import java.io.IOException;
import java.text.DateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

  private final AmazonS3 amazonS3;

  @Value("${cloud.aws.s3.bucket}")
  private String bucket;

  public String saveFile(MultipartFile multipartFile, String type, String userId) {

    try {

      ObjectMetadata metadata = new ObjectMetadata();
      metadata.setContentLength(multipartFile.getSize());
      metadata.setContentType(multipartFile.getContentType());

      // S3에 파일 저장하는 경로
      String path = getFilename(type, userId, multipartFile);

      amazonS3.putObject(bucket, path, multipartFile.getInputStream(), metadata);

      return amazonS3.getUrl(bucket, path).toString();

    } catch (IOException e) {
      throw new CustomException(ResponseCode.CANNOT_UPLOAD_FILE);
    }

  }

  private String getFilename(String type, String userId, MultipartFile multipartFile) {

    StringBuilder filePath = new StringBuilder();
    String extension = StringUtils.getFilenameExtension(
        multipartFile.getOriginalFilename());

    if (type.equals("profile")) {
      filePath.append("profile/").append(userId);
    } else {
      LocalDateTime now = LocalDateTime.now();
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd_HHmm");
      filePath.append("speech/").append(userId).append("/").append(now.format(formatter));
    }

    filePath.append(".").append(extension);
    return filePath.toString();
  }
}
