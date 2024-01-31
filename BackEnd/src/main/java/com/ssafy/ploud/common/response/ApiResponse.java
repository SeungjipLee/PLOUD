package com.ssafy.ploud.common.response;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ApiResponse<T> implements Serializable {

  private int status;
  private String message;
  private T data;

  ApiResponse(ResponseResult responseResult) {
    this.status = responseResult.getStatus();
    this.message = responseResult.getMessage();
  }

  ApiResponse(ResponseResult responseResult, T data) {
    this.status = responseResult.getStatus();
    this.message = responseResult.getMessage();
    this.data = data;
  }

  public static <T> ApiResponse<T> newok(int status, String message, T data) {
//    return new ApiResponse<>(new ResponseResult(ResponseCode.SUCCESS).getStatus(), message, null);
    return new ApiResponse<>(status, message, data);
  }

  public static <T> ApiResponse<T> newok(HttpStatus status, String message, T data) {
    return new ApiResponse<>(status.value(), message, data);
//    return new ApiResponse<>(new ResponseResult(ResponseCode.SUCCESS).getStatus(), message, data);
  }

  public static <T> ApiResponse<T> ok(String message) {
    return new ApiResponse<>(new ResponseResult(ResponseCode.SUCCESS).getStatus(), message, null);
  }

  public static <T> ApiResponse<T> ok(String message, T data) {
    return new ApiResponse<>(new ResponseResult(ResponseCode.SUCCESS).getStatus(), message, data);
  }

  public static <T> ApiResponse<T> failure(String message, ResponseCode responseCode) {
    return new ApiResponse<>(new ResponseResult(responseCode).getStatus(), message, null);
  }

  public static <T> ApiResponse<T> error(String message) {
    return new ApiResponse<>(new ResponseResult(ResponseCode.INTERNAL_SERVER_ERROR).getStatus(),
        message, null);
  }
}
