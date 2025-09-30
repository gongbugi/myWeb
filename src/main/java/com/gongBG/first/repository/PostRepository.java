package com.gongBG.first.repository;

import com.gongBG.first.domain.Post;
import com.gongBG.first.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByUser(User user);
    List<Post> findByUserAndCategoryId(User user, Long categoryId);
}
