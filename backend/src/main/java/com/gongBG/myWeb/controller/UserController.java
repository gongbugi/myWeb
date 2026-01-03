package com.gongBG.myWeb.controller;

import com.gongBG.myWeb.domain.User;
import com.gongBG.myWeb.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestAttribute(name = "loginUser") String uid) {

        userService.signup(uid);

        return ResponseEntity.ok("회원가입 완료");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestAttribute(name = "loginUser") String uid) {
        userService.login(uid);
        return ResponseEntity.ok("로그인 성공");
    }

    @GetMapping("/role")
    public ResponseEntity<String> getMyRole(@RequestAttribute(name = "loginUser") String uid) {
        User user = userService.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));
        return ResponseEntity.ok(user.getRole().name());
    }
}