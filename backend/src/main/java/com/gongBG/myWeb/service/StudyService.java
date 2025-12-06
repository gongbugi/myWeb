package com.gongBG.myWeb.service;

import com.gongBG.myWeb.domain.Category;
import com.gongBG.myWeb.domain.StudyPost;
import com.gongBG.myWeb.domain.User;
import com.gongBG.myWeb.dto.StudyPostRequestDto;
import com.gongBG.myWeb.dto.StudyPostResponseDto;
import com.gongBG.myWeb.repository.CategoryRepository;
import com.gongBG.myWeb.repository.StudyPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudyService {

    private final StudyPostRepository studyPostRepository;
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<StudyPostResponseDto> getPosts(User user, Long categoryId) {
        if (categoryId == null || categoryId == 0) {
            return studyPostRepository.findAllByUser(user).stream()
                    .map(StudyPostResponseDto::new)
                    .collect(Collectors.toList());
        }
        return studyPostRepository.findByUserAndCategoryId(user, categoryId).stream()
                .map(StudyPostResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Category> getCategories(User user) {
        return categoryRepository.findAllByUser(user);
    }

    public void savePost(StudyPostRequestDto requestDto, User user){
        Category category;

        if (StringUtils.hasText(requestDto.getNewCategoryName())) {
            category = new Category(requestDto.getNewCategoryName(), user);
            categoryRepository.save(category);
        }
        else if (requestDto.getCategoryId() != null) {
            category = categoryRepository.findById(requestDto.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("선택한 카테고리가 존재하지 않습니다."));
            if (!category.getUser().getId().equals(user.getId())) {
                throw new IllegalArgumentException("다른 사용자의 카테고리를 선택할 수 없습니다.");
            }
        }
        else {
            throw new IllegalArgumentException("카테고리를 선택하거나 새로 입력해야 합니다.");
        }
        StudyPost studyPost = new StudyPost(requestDto.getTitle(), requestDto.getContent(), category, user);
        studyPostRepository.save(studyPost);
    }

    @Transactional(readOnly = true)
    public StudyPostResponseDto getPost(Long postId, User user){
        StudyPost studyPost = studyPostRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postId));

        if (!studyPost.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("해당 게시글을 조회할 권한이 없습니다.");
        }

        return new StudyPostResponseDto(studyPost);
    }

    @Transactional
    public void deletePost(Long postId, User user){
        StudyPost studyPost = studyPostRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postId));
        if(!studyPost.getUser().getId().equals(user.getId())){
            throw new IllegalArgumentException("게시글 삭제 권한이 없습니다.");
        }
        studyPostRepository.delete(studyPost);
    }

    @Transactional
    public void updatePost(Long postId, StudyPostRequestDto requestDto, User user){
        StudyPost studyPost = studyPostRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        if(!studyPost.getUser().getId().equals(user.getId())){
            throw new IllegalArgumentException("게시글 수정 권한이 없습니다.");
        }

        Category category;
        if(StringUtils.hasText(requestDto.getNewCategoryName())){
            category = new Category(requestDto.getNewCategoryName(), user);
            categoryRepository.save(category);
        } else if(requestDto.getCategoryId() != null){
            category = categoryRepository.findById(requestDto.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("선택한 카테고리가 존재하지 않습니다."));
        } else {
            throw  new IllegalArgumentException("카테고리를 선택하거나 새로 입력해야 합니다.");
        }

        studyPost.update(requestDto.getTitle(), requestDto.getContent(), category);
    }

    @Transactional
    public void deleteCategory(Long categoryId, User user){
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다."));

        if(!category.getUser().getId().equals(user.getId())){
            throw new IllegalArgumentException("카테고리 삭제 권한이 없습니다.");
        }

        List<StudyPost> studyPosts = studyPostRepository.findByUserAndCategoryId(user, categoryId);

        if(!studyPosts.isEmpty()){
            throw new IllegalArgumentException("해당 카테고리에 게시글이 존재하여 삭제할 수 없습니다.");
        }

        categoryRepository.delete(category);
    }
}
