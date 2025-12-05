package com.gongBG.myWeb.service;

import com.gongBG.myWeb.domain.Category;
import com.gongBG.myWeb.domain.Post;
import com.gongBG.myWeb.domain.User;
import com.gongBG.myWeb.dto.PostRequestDto;
import com.gongBG.myWeb.dto.PostResponseDto;
import com.gongBG.myWeb.repository.CategoryRepository;
import com.gongBG.myWeb.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

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

    public void savePost(PostRequestDto requestDto, User user){
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
        Post post = new Post(requestDto.getTitle(), requestDto.getContent(), category, user);
        postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public PostResponseDto getPost(Long postId, User user){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postId));

        if (!post.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("해당 게시글을 조회할 권한이 없습니다.");
        }

        return new PostResponseDto(post);
    }

    @Transactional
    public void deletePost(Long postId, User user){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postId));
        if(!post.getUser().getId().equals(user.getId())){
            throw new IllegalArgumentException("게시글 삭제 권한이 없습니다.");
        }
        postRepository.delete(post);
    }

    @Transactional
    public void updatePost(Long postId, PostRequestDto requestDto, User user){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        if(!post.getUser().getId().equals(user.getId())){
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

        post.update(requestDto.getTitle(), requestDto.getContent(), category);
    }
}
