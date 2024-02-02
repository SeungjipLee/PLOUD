package com.ssafy.ploud.domain.record;

import com.ssafy.ploud.domain.record.dto.response.ScoreDetail;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Getter
@Table(name="scores")
public class ScoreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "score_id")
    private int id; // 평가 번호

//    @OneToOne(fetch = FetchType.LAZY, mappedBy = "score")
//    private SpeechEntity speech; // 발표 번호

    private int volume; // 목소리 크기

    private int speed; // 발화 속도

    private int clarity; // 명료도

    private int eye; // 시선

  public ScoreDetail toDto() {
    return ScoreDetail.builder()
        .volume(volume)
        .speed(speed)
        .clarity(clarity)
        .eye(eye)
        .grade((volume + speed + clarity) / 3)
        .build();
  }

}
