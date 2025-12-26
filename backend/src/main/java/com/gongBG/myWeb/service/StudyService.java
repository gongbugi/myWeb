package com.gongBG.myWeb.service;

import com.gongBG.myWeb.domain.Category;
import com.gongBG.myWeb.domain.Role;
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
    public List<StudyPostResponseDto> getPosts(Long categoryId) {
        if (categoryId == null || categoryId == 0) {
            return studyPostRepository.findAll().stream()
                    .map(StudyPostResponseDto::new)
                    .collect(Collectors.toList());
        }
        return studyPostRepository.findByCategoryId(categoryId).stream()
                .map(StudyPostResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public StudyPostResponseDto getPost(Long postId){
        StudyPost studyPost = studyPostRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postId));

        return new StudyPostResponseDto(studyPost);
    }

    public void savePost(StudyPostRequestDto requestDto, User user){
        if(user.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("게시글 작성 권한이 없습니다.");
        }

        Category category;

        if (StringUtils.hasText(requestDto.getNewCategoryName())) {
            category = new Category(requestDto.getNewCategoryName());
            categoryRepository.save(category);
        }
        else if (requestDto.getCategoryId() != null) {
            category = categoryRepository.findById(requestDto.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("선택한 카테고리가 존재하지 않습니다."));
        }
        else {
            throw new IllegalArgumentException("카테고리를 선택하거나 새로 입력해야 합니다.");
        }
        StudyPost studyPost = new StudyPost(requestDto.getTitle(), requestDto.getContent(), category, user);
        studyPostRepository.save(studyPost);
    }

    @Transactional
    public void deletePost(Long postId, User user){
        if (user.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("게시글 삭제 권한이 없습니다.");
        }
        StudyPost studyPost = studyPostRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postId));
        studyPostRepository.delete(studyPost);
    }

    @Transactional
    public void updatePost(Long postId, StudyPostRequestDto requestDto, User user){
        if(user.getRole() != Role.ADMIN){
            throw new IllegalArgumentException("게시글 수정 권한이 없습니다.");
        }

        StudyPost studyPost = studyPostRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        Category category;
        
        if(StringUtils.hasText(requestDto.getNewCategoryName())){
            category = new Category(requestDto.getNewCategoryName());
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
        if(user.getRole() != Role.ADMIN){
            throw new IllegalArgumentException("카테고리 삭제 권한이 없습니다.");
        }

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다."));

        List<StudyPost> studyPosts = studyPostRepository.findByCategoryId(categoryId);

        if(!studyPosts.isEmpty()){
            throw new IllegalArgumentException("해당 카테고리에 게시글이 존재하여 삭제할 수 없습니다.");
        }

        categoryRepository.delete(category);
    }
}
