package com.ssafy.ploud.common.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ResponseStatus {

  SUCCESS(HttpStatus.OK, 200, "success"),
  BAD_REQUEST(HttpStatus.BAD_REQUEST, 400, "bad request"),
  UNAUTHORIZED(HttpStatus.UNAUTHORIZED, 409, "UnAuthorized"),

  INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "internal server error"),
  NOT_FOUND(HttpStatus.NOT_FOUND, 404, "not found");

  private HttpStatus status;
  private int code;
  private String message;

  ResponseStatus(HttpStatus status, int code, String message) {
    this.status = status;
    this.code = code;
    this.message = message;
  }

}
