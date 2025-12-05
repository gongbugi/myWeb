package com.gongBG.first.controller;

import com.gongBG.first.domain.User;
import com.gongBG.first.dto.PostResponseDto;
import com.gongBG.first.repository.UserRepository;
import com.gongBG.first.service.StudyService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
@RequiredArgsConstructor
public class PageController {
    private final StudyService studyService;
    private final UserRepository userRepository;

    @GetMapping("/")
    String home() {
        return "redirect:/login";
    }

    @GetMapping("/main")
    String mainPage() {
        return "main";
    }

    @GetMapping("/login")
    String loginPage(HttpSession session) {
        if (session.getAttribute("loginUser") != null) {
            return "redirect:/main";
        }
        return "login";
    }

    @GetMapping("/signup")
    String signupPage() {
        return "signup";
    }

    @GetMapping("/hobby")
    public String hobbyPage() {
        return "hobby";
    }

    @GetMapping("/study")
    public String studyPage(Model model, @RequestParam(required = false) Long categoryId, @SessionAttribute(name = "loginUser") String userid) {
        User loginUser = userRepository.findByUserid(userid)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        model.addAttribute("categories", studyService.getCategories(loginUser));
        model.addAttribute("posts", studyService.getPosts(loginUser, categoryId));
        return "study";
    }

    @GetMapping("/study/write")
    public String writePage(Model model, @SessionAttribute(name = "loginUser") String userid) {
        User loginUser = userRepository.findByUserid(userid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));
        model.addAttribute("categories", studyService.getCategories(loginUser));
        return "write";
    }

    @GetMapping("/study/{postId}")
    public String postPage(@PathVariable Long postId,
                           Model model,
                           @SessionAttribute(name = "loginUser") String userid) {

        User loginUser = userRepository.findByUserid(userid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        try {
            PostResponseDto post = studyService.getPost(postId, loginUser);

            model.addAttribute("post", post);

            return "post";

        } catch (IllegalArgumentException e) {
            System.err.println("게시글 조회 실패: " + e.getMessage());
            return "redirect:/study";
        }
    }

    @GetMapping("/study/{postId}/edit")
    public String editPage(@PathVariable Long postId,
                           Model model,
                           @SessionAttribute(name = "loginUser") String userid){
        User loginUser = userRepository.findByUserid(userid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));

        PostResponseDto post = studyService.getPost(postId, loginUser);

        model.addAttribute("post", post);
        model.addAttribute("categories", studyService.getCategories(loginUser));


        return "write";
    }
}
