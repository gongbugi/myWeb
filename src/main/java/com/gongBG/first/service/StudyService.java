package com.gongBG.first.service;

import com.gongBG.first.domain.Category;
import com.gongBG.first.domain.User;
import com.gongBG.first.dto.PostResponseDto;
import com.gongBG.first.repository.CategoryRepository;
import com.gongBG.first.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudyService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<PostResponseDto> getPosts(User user, Long categoryId) {
        if (categoryId == null || categoryId == 0) {
            return postRepository.findAllByUser(user).stream()
                    .map(PostResponseDto::new)
                    .collect(Collectors.toList());
        }
        return postRepository.findByUserAndCategoryId(user, categoryId).stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Category> getCategories(User user) {
        return categoryRepository.findAllByUser(user);
    }
}
