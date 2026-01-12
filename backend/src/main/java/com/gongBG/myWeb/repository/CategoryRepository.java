package com.gongBG.myWeb.repository;

import com.gongBG.myWeb.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
