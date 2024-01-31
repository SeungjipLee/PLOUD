package com.ssafy.ploud.domain.record;

import com.ssafy.ploud.domain.speech.SpeechEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Getter
@Table(name="scores")
public class ScoreEntity {

    @Id
    @GeneratedValue
    private int id; // 평가 번호

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "score")
    private SpeechEntity speech; // 발표 번호

    private int volume; // 목소리 크기

    private int speed; // 발화 속도

    private int clarity; // 명료도

    private int eye; // 시선

    private int grade; // 종합 등급

}
