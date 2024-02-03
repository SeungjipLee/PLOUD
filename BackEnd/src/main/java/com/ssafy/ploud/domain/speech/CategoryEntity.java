package com.ssafy.ploud.domain.speech;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
@Table(name = "categories")
public class CategoryEntity {
  @Id
  @GeneratedValue
  private int id;

  @NotNull
  private String name;
}
