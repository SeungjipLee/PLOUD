package com.ssafy.ploud.domain.record.repository;

import com.ssafy.ploud.domain.record.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<VideoEntity, Integer> {

}
