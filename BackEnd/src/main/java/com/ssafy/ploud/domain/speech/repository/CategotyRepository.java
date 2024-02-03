package com.ssafy.ploud.domain.speech.repository;

import com.ssafy.ploud.domain.speech.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategotyRepository extends JpaRepository<CategoryEntity, String> {

}
