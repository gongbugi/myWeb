package com.gongBG.first.controller;

import com.gongBG.first.domain.User;
import com.gongBG.first.dto.PostRequestDto;
import com.gongBG.first.repository.UserRepository;
import com.gongBG.first.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

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
}
