package com.gongBG.myWeb.controller;

import com.gongBG.myWeb.domain.User;
import com.gongBG.myWeb.dto.PostRequestDto;
import com.gongBG.myWeb.dto.PostResponseDto;
import com.gongBG.myWeb.repository.UserRepository;
import com.gongBG.myWeb.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@RequestMapping("/api/study")
@RequiredArgsConstructor
public class PostController {
    private final StudyService studyService;
    private final UserRepository userRepository;
    @GetMapping("/{postId}")
    public ResponseEntity<PostResponseDto> getPost(@PathVariable Long postId,
                                                   @RequestAttribute(name = "loginUser") String uid) {

        User loginUser = userRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        PostResponseDto responseDto = studyService.getPost(postId, loginUser);

        return ResponseEntity.ok(responseDto);
    }
    @PostMapping("/write")
    public ResponseEntity<String> writePost(@RequestBody PostRequestDto requestDto,
                                            @RequestAttribute(name = "loginUser") String uid) {

        User loginUser = userRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        studyService.savePost(requestDto, loginUser);

        return ResponseEntity.ok("게시글 등록 성공");
    }

    @PostMapping("/study/{postId}/delete")
    public String deletePost(@PathVariable Long postId,
                             @RequestAttribute(name = "loginUser") String uid){

        User loginUser = userRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        studyService.deletePost(postId, loginUser);

        return "redirect:/study";
    }

    @PostMapping("/study/{postId}/edit")
    public String updatePost(@PathVariable Long postId,
                             @ModelAttribute PostRequestDto requestDto,
                             @RequestAttribute(name = "loginUser") String uid) {

        User loginUser = userRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        studyService.updatePost(postId, requestDto, loginUser);

        return "redirect:/study/" + postId; // 수정 후 상세 페이지로 이동
    }

    @PostMapping("study/category/{categoryId}/delete")
    public String deleteCategory(@PathVariable Long categoryId,
                                 @RequestAttribute(name = "loginUser") String uid,
                                 RedirectAttributes redirectAttributes){
        User loginUser = userRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        try {
            studyService.deleteCategory(categoryId, loginUser);
        } catch (IllegalArgumentException e) {
            redirectAttributes.addAttribute("errorMessage", e.getMessage());
        }

        return "redirect:/study";
    }
}
