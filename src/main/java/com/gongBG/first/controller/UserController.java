package com.gongBG.first.controller;

import com.gongBG.first.dto.LoginRequestDto;
import com.gongBG.first.dto.SignUpRequestDto;
import com.gongBG.first.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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