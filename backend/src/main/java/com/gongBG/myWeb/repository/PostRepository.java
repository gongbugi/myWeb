package com.gongBG.myWeb.repository;

import com.gongBG.myWeb.domain.Post;
import com.gongBG.myWeb.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByUser(User user);
    List<Post> findByUserAndCategoryId(User user, Long categoryId);
}
