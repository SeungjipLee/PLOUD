package com.ssafy.ploud.common.exception;

public class JwtCustomException extends RuntimeException {

  public JwtCustomException(String message) {
    super(message);
  }
}
