package com.gongBG.myWeb.controller;

import com.gongBG.myWeb.domain.Category;
import com.gongBG.myWeb.domain.User;
import com.gongBG.myWeb.dto.PostRequestDto;
import com.gongBG.myWeb.dto.PostResponseDto;
import com.gongBG.myWeb.repository.UserRepository;
import com.gongBG.myWeb.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/study")
@RequiredArgsConstructor
public class StudyController {
    private final StudyService studyService;
    private final UserRepository userRepository;

    //===1. 게시글 목록 조회===//
    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getPostList(@RequestParam(required = false) Long categoryId,
                                                             @RequestAttribute(name = "loginUser") String uid) {
        User loginUser = userRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        List<PostResponseDto> posts = studyService.getPosts(loginUser, categoryId);

        return ResponseEntity.ok(posts);
    }

    //===2. 카테고리 목록 조회===//
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories(@RequestAttribute(name = "loginUser") String uid) {

        User loginUser = userRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        List<Category> categories = studyService.getCategories(loginUser);

        return ResponseEntity.ok(categories);
    }

    //===3. 게시글 상세 조회===//
    @GetMapping("/{postId}")
    public ResponseEntity<PostResponseDto> getPost(@PathVariable Long postId,
                                                   @RequestAttribute(name = "loginUser") String uid) {

        User loginUser = userRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        PostResponseDto responseDto = studyService.getPost(postId, loginUser);

        return ResponseEntity.ok(responseDto);
    }

    //===4. 게시글 작성===//
    @PostMapping("/write")
    public ResponseEntity<String> writePost(@RequestBody PostRequestDto requestDto,
                                            @RequestAttribute(name = "loginUser") String uid) {

        User loginUser = userRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        studyService.savePost(requestDto, loginUser);

        return ResponseEntity.ok("게시글 등록 성공");
    }

    //===5. 게시글 삭제===//
    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId,
                             @RequestAttribute(name = "loginUser") String uid){

        User loginUser = userRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        studyService.deletePost(postId, loginUser);

        return ResponseEntity.ok("게시글 삭제 성공");
    }

    //===6. 게시글 수정===//
    @PutMapping("{postId}")
    public ResponseEntity<String> updatePost(@PathVariable Long postId,
                             @RequestBody PostRequestDto requestDto,
                             @RequestAttribute(name = "loginUser") String uid) {

        User loginUser = userRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        studyService.updatePost(postId, requestDto, loginUser);

        return ResponseEntity.ok("게시글 수정 성공");
    }

    //===7. 카테고리 삭제===//
    @DeleteMapping("/category/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId,
                                 @RequestAttribute(name = "loginUser") String uid) {
        User loginUser = userRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        studyService.deleteCategory(categoryId, loginUser);

        return ResponseEntity.ok("카테고리 삭제 성공");
    }
}
