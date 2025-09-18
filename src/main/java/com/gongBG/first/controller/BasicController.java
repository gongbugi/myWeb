package com.gongBG.first.controller;

import com.gongBG.first.dto.LoginRequestDto;
import com.gongBG.first.dto.SignUpRequestDto;
import com.gongBG.first.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class BasicController {

    private final UserService userService;

    public BasicController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    String home() {
        return "redirect:/login";
    }

    @GetMapping("/main")
    String mainPage(){
        return "main";
    }

    @GetMapping("/login")
    String loginPage(){
        return "login";
    }

    @GetMapping("/signup")
    String signupPage(){
        return "signup";
    }

    @PostMapping("/login")
    String login(@ModelAttribute LoginRequestDto requestDto){
        try {
            userService.login(requestDto);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return "redirect:/login";
        }
        return "redirect:/main";
    }

    @PostMapping("/signup")
    String signup(@ModelAttribute SignUpRequestDto requestDto){
        try {
            userService.signup(requestDto);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return "redirect:/signup";
        }
        return "redirect:/login";
    }
}