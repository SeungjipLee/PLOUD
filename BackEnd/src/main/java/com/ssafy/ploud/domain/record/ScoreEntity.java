package com.ssafy.ploud.domain.record;

import com.ssafy.ploud.domain.record.dto.response.ScoreDetail;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name="scores")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScoreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "score_id")
    private int id; // 평가 번호

//    @OneToOne(fetch = FetchType.LAZY, mappedBy = "score")
//    private SpeechEntity speech; // 발표 번호


    private int volume = 29; // 목소리 크기

    private int speed = 29; // 발화 속도

    private int clarity = 29; // 명료도

  public ScoreDetail toDto() {
    return ScoreDetail.builder()
        .volume(volume)
        .speed(speed)
        .clarity(clarity)
        .grade((volume + speed + clarity) / 3)
        .build();
  }

  public ScoreDetail toDtoWithSpeechDate(LocalDateTime speechDate) {
    return ScoreDetail.builder()
        .volume(volume)
        .speed(speed)
        .clarity(clarity)
        .grade((volume + speed + clarity) / 3)
        .date(speechDate.format(DateTimeFormatter.ofPattern("yyyy.MM.dd hh:mm")))
        .build();
  }

  public void updateVolume(int volume) {
    this.volume = volume;
  }

  public void updateClearity(int clearityScore) {
    this.clarity = clearityScore;
  }

  public void updateSpeed(int speedScore) {
    this.speed = speedScore;
  }

}
