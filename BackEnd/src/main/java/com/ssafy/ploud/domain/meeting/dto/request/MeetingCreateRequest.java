package com.ssafy.ploud.domain.meeting.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class MeetingCreateRequest {
    private String managerId;
    private int categoryId;
    private String title;
    private int maxPeople;
    private Boolean isPrivate;
    private String password;
}
