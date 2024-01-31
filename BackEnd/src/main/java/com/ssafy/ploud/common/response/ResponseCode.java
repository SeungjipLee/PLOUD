package com.ssafy.ploud.common.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.hc.core5.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ResponseCode {

  SUCCESS(HttpStatus.SC_OK, "success"),
  BAD_REQUEST(HttpStatus.SC_BAD_REQUEST, "bad request"),
  UNAUTHORIZED(HttpStatus.SC_UNAUTHORIZED, "UnAuthorized"),
  CONFLICT(HttpStatus.SC_CONFLICT, "conflict"),
  INTERNAL_SERVER_ERROR(HttpStatus.SC_INTERNAL_SERVER_ERROR, "internal server error"),
  NOT_FOUND(HttpStatus.SC_NOT_FOUND, "not found"),

  // 유저
  USER_NOT_FOUND(HttpStatus.SC_NOT_FOUND, "유저가 존재하지 않습니다"),
  USER_SIGNUP_REQUIRE(HttpStatus.SC_NOT_FOUND, "회원가입이 필요합니다"),
  USER_NICKNAME_DUPLICATED(HttpStatus.SC_CONFLICT, "이미 등록된 닉네임입니다"),
  USER_ID_DUPLICATED(HttpStatus.SC_CONFLICT, "이미 등록된 아이디입니다"),
  USER_EMAIL_DUPLICATED(HttpStatus.SC_CONFLICT, "이미 등록된 이메일입니다"),
  CODE_INVALID_VALUE(HttpStatus.SC_BAD_REQUEST, "인증코드를 확인해주세요"),
  MAIL_SEND_ERROR(HttpStatus.SC_INTERNAL_SERVER_ERROR, "메일을 전송하지 못했습니다"),

  // 스터디 룸
  ROOM_NOT_FOUND(HttpStatus.SC_NOT_FOUND, "방이 존재하지 않습니다"),
  ROOM_ALREADY_CLOSED(HttpStatus.SC_NOT_FOUND, "이미 종료된 스터디 룸"),
  ROOM_CLOSE_ACCESS_DENIED(HttpStatus.SC_FORBIDDEN, "스터디룸 종료 권한이 없습니다"),
  ROOM_FULL(HttpStatus.SC_BAD_REQUEST, "자리 없음"),
  ROOM_INVALID_VALUE(HttpStatus.SC_BAD_REQUEST, "입력 내용을 다시 확인해주세요"),

  // 녹화
  SESSION_NOT_FOUND(HttpStatus.SC_UNAUTHORIZED, "세선을 찾을 수 없음"),
  RECORD_PROCEEDING(HttpStatus.SC_NOT_FOUND, "현재 녹화가 진행중임");

  // 게시글

  private final int code;
  private final String message;

}
