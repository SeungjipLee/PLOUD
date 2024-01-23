package com.ssafy.ploud.domain.meeting.dto;

import com.ssafy.ploud.domain.meeting.dto.request.MeetingCreateRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeetingInfo {

    private String sessionId;
    private String managerId;
    private String categoryId;
    private String title;
    private Integer currentPeople;
    private Integer maxPeople;
    private Boolean isPrivate;
    private String password;
    private String token;

    public MeetingInfo(String token, String sessionId, MeetingCreateRequest request) {
        this.sessionId = sessionId;
        this.managerId = request.getManagerId();
        this.categoryId = request.getCategoryId();
        this.title = request.getTitle();
        this.currentPeople = 1;
        this.maxPeople = request.getMaxPeople();
        this.isPrivate = request.getIsPublic();
        this.password = request.getPassword();
        this.token = token;
    }
}

