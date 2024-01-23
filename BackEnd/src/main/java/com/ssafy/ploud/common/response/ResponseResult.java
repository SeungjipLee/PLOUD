package com.ssafy.ploud.common.response;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseResult implements Serializable {

  private int status;
  private String message;

  ResponseResult(ResponseStatus responseStatus) {
    this.status = responseStatus.getCode();
    this.message = responseStatus.getMessage();
  }

  ResponseResult(ResponseStatus responseStatus, String message) {
    this.status = responseStatus.getCode();
    this.message = message;
  }
}
