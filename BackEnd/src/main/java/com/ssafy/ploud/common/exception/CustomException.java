package com.ssafy.ploud.common.exception;

import com.ssafy.ploud.common.response.ResponseCode;
import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

  private final ResponseCode code;
  private final String message;

  public CustomException(ResponseCode responseCode) {
    super(responseCode.getMessage());
    this.code = responseCode;
    this.message = responseCode.getMessage();
  }

}
