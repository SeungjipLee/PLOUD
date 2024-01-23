package com.ssafy.ploud.domain.meeting.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class MeetingCreateRequest {
    private String managerId;
    private String categoryId;
    private String title;
    private int maxPeople;
    private Boolean isPrivate;
    private String password;
}
