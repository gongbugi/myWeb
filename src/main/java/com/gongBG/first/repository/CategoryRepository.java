package com.gongBG.first.repository;

import com.gongBG.first.domain.Category;
import com.gongBG.first.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUser(User user);
}
