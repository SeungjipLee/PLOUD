package com.ssafy.ploud.common.response;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;

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

  public static <T> ApiResponse<T> ok(String message) {
    return new ApiResponse<>(new ResponseResult(ResponseStatus.SUCCESS).getStatus(), message, null);
  }

  public static <T> ApiResponse<T> ok(String message, T data) {
    return new ApiResponse<>(new ResponseResult(ResponseStatus.SUCCESS).getStatus(), message, data);
  }

  public static <T> ApiResponse<T> failure(String message, ResponseStatus responseStatus) {
    return new ApiResponse<>(new ResponseResult(responseStatus).getStatus(), message, null);
  }

  public static <T> ApiResponse<T> error(String message) {
    return new ApiResponse<>(new ResponseResult(ResponseStatus.INTERNAL_SERVER_ERROR).getStatus(),
        message, null);
  }
}
