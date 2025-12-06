package com.gongBG.myWeb.repository;

import com.gongBG.myWeb.domain.StudyPost;
import com.gongBG.myWeb.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyPostRepository extends JpaRepository<StudyPost, Long> {
    List<StudyPost> findAllByUser(User user);
    List<StudyPost> findByUserAndCategoryId(User user, Long categoryId);
}
