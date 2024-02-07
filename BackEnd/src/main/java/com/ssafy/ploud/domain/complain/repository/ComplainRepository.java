package com.ssafy.ploud.domain.complain.repository;

import com.ssafy.ploud.domain.complain.ComplainEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplainRepository extends JpaRepository<ComplainEntity, Integer> {

}
