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
  USER_LOGIN_RERQUIRED(HttpStatus.SC_UNAUTHORIZED, "로그인이 필요합니다"),
  USER_IMAGE_ERROR(HttpStatus.SC_INTERNAL_SERVER_ERROR, "프로필 사진 읽는 중 오류 발생"),

  // 스터디 룸
  ROOM_NOT_FOUND(HttpStatus.SC_NOT_FOUND, "방이 존재하지 않습니다"),
  ROOM_ALREADY_CLOSED(HttpStatus.SC_NOT_FOUND, "이미 종료된 스터디 룸"),
  ROOM_CLOSE_ACCESS_DENIED(HttpStatus.SC_FORBIDDEN, "스터디룸 종료 권한이 없습니다"),
  ROOM_FULL(HttpStatus.SC_BAD_REQUEST, "자리 없음"),
  ROOM_PASSWORD_ERROR(HttpStatus.SC_BAD_REQUEST, "비밀번호가 틀렸습니다."),
  ROOM_INVALID_VALUE(HttpStatus.SC_BAD_REQUEST, "입력 내용을 다시 확인해주세요"),
  ROOM_LEAVE_FAIL(HttpStatus.SC_BAD_REQUEST, "방 종료 실패"),
  OPENBVIDU_TOKEN_ERROR(HttpStatus.SC_BAD_REQUEST, "openvidu token이 올바르지 않습니다."),
  OPENVIDU_ERROR(HttpStatus.SC_BAD_REQUEST, "openVidu Error"),

  // 녹화
  SESSION_NOT_FOUND(HttpStatus.SC_UNAUTHORIZED, "세선을 찾을 수 없음"),
  RECORD_PROCEEDING(HttpStatus.SC_NOT_FOUND, "현재 녹화가 진행중임"),

  // 평가
  ETRI_ERROR(HttpStatus.SC_BAD_REQUEST, "평가 결과를 알 수 없습니다."),

  // 게시글

  // JWT
  INVALID_JWT_TOKEN(HttpStatus.SC_UNAUTHORIZED, "invalid JWT token"),
  UNSUPPORTED_JWT_TOKEN(HttpStatus.SC_UNAUTHORIZED, "unsupported JWT token"),
  JWT_CLAIM_EMPTY(HttpStatus.SC_UNAUTHORIZED, "JWT claims string is empty"),
  JWT_VALIDATION_FAIL(HttpStatus.SC_UNAUTHORIZED, "JWT signature validation fails"),
  JWT_TOKEN_EXPIRED(HttpStatus.SC_UNAUTHORIZED, "JWT token expired"),
  WRONG_REFRESH_TOKEN(HttpStatus.SC_UNAUTHORIZED, "wrong refresh token"),
  REFRESH_TOKEN_EXPIRED(HttpStatus.SC_UNAUTHORIZED, "Refresh token expired"),

  // FFMPEG
  FILE_CONVERT_ERROR(HttpStatus.SC_BAD_REQUEST, "파일 변환 중 에러"),

  // 발표
  SPEECH_NOT_FOUND(HttpStatus.SC_NOT_FOUND, "발표를 찾을 수 없습니다"),

  // 디렉터리
  ALREADY_EXISTS(HttpStatus.SC_CONFLICT, "폴더가 이미 존재합니다");

  private final int code;
  private final String message;

}
