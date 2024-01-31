package com.ssafy.ploud.common.response;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseResult implements Serializable {

  private int status;
  private String message;

  ResponseResult(ResponseCode responseCode) {
    this.status = responseCode.getCode();
    this.message = responseCode.getMessage();
  }

  ResponseResult(ResponseCode responseCode, String message) {
    this.status = responseCode.getCode();
    this.message = message;
  }
}
