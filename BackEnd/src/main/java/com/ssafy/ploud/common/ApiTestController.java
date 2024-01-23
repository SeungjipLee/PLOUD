package com.ssafy.ploud.common;


import com.ssafy.ploud.common.response.ApiResponse;
import com.ssafy.ploud.common.response.ResponseStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/test")
public class ApiTestController {

  @GetMapping("/ok")
  public ApiResponse<?> hello() {
    return ApiResponse.ok("요청 처리 성공");
  }

  @GetMapping("/ok-data")
  public ApiResponse<?> ok() {
    return ApiResponse.ok("data 조회 성공", "data");
  }

  @GetMapping("/fail")
  public ApiResponse<?> fail() {
    return ApiResponse.failure("Not found message", ResponseStatus.NOT_FOUND);
  }

  @GetMapping("/error")
  public ApiResponse<?> error() {
    return ApiResponse.error("에러 메시지");
  }
}
