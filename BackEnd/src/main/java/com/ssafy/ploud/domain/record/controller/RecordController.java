package com.ssafy.ploud.domain.record.controller;

import com.ssafy.ploud.domain.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

}
