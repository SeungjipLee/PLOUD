package com.ssafy.ploud.common.exception;

import com.ssafy.ploud.common.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResponse<?>> handleException(Exception e) {

    ApiResponse<?> errorResponse = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(),
        e.getMessage(), null);

    // 에러 응답 생성
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR.value()).body(errorResponse);
  }

  @ExceptionHandler(CustomException.class)
  public ResponseEntity<ApiResponse<?>> handleCustomException(CustomException e) {
    // 에러 정보를 담은 ErrorResponse 객체 생성
    ApiResponse<?> errorResponse = new ApiResponse<>(e.getCode().getCode(), e.getMessage(), null);

    // 에러 응답 생성
    return ResponseEntity.status(e.getCode().getCode()).body(errorResponse);
  }

}
