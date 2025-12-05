package com.gongBG.myWeb.controller;

import com.gongBG.myWeb.domain.User;
import com.gongBG.myWeb.dto.PostRequestDto;
import com.gongBG.myWeb.repository.UserRepository;
import com.gongBG.myWeb.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequiredArgsConstructor
public class PostController {
    private final StudyService studyService;
    private final UserRepository userRepository;

    @PostMapping("/study/write")
    public String writePost(@ModelAttribute PostRequestDto requestDto,
                            @SessionAttribute(name = "loginUser") String userid) {

        User loginUser = userRepository.findByUserid(userid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        studyService.savePost(requestDto, loginUser);

        return "redirect:/study";
    }

    @PostMapping("/study/{postId}/delete")
    public String deletePost(@PathVariable Long postId,
                             @SessionAttribute(name = "loginUser") String userid){

        User loginUser = userRepository.findByUserid(userid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        studyService.deletePost(postId, loginUser);

        return "redirect:/study";
    }

    @PostMapping("/study/{postId}/edit")
    public String updatePost(@PathVariable Long postId,
                             @ModelAttribute PostRequestDto requestDto,
                             @SessionAttribute(name = "loginUser") String userid) {

        User loginUser = userRepository.findByUserid(userid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        studyService.updatePost(postId, requestDto, loginUser);

        return "redirect:/study/" + postId; // 수정 후 상세 페이지로 이동
    }

    @PostMapping("study/category/{categoryId}/delete")
    public String deleteCategory(@PathVariable Long categoryId,
                                 @SessionAttribute(name = "loginUser") String userid,
                                 RedirectAttributes redirectAttributes){
        User loginUser = userRepository.findByUserid(userid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        try {
            studyService.deleteCategory(categoryId, loginUser);
        } catch (IllegalArgumentException e) {
            redirectAttributes.addAttribute("errorMessage", e.getMessage());
        }

        return "redirect:/study";
    }
}
