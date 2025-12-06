package com.gongBG.myWeb.repository;

import com.gongBG.myWeb.domain.Category;
import com.gongBG.myWeb.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByUser(User user);
}
