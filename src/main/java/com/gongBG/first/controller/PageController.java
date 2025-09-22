package com.gongBG.first.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
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

    @GetMapping("/hobby")
    public String hobbyPage() {
        return "hobby";
    }

    @GetMapping("/study")
    public String studyPage() {
        return "study";
    }
}
