package com.gongBG.myWeb.repository;

import com.gongBG.myWeb.domain.CoffeeLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoffeeLogRepository extends JpaRepository<CoffeeLog, Long> {
    List<CoffeeLog> findAllByOrderByIdDesc();
}
