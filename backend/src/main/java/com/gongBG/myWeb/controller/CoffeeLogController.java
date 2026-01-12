package com.gongBG.myWeb.controller;

import com.gongBG.myWeb.domain.User;
import com.gongBG.myWeb.dto.CoffeeLogListResponseDto;
import com.gongBG.myWeb.dto.CoffeeLogRequestDto;
import com.gongBG.myWeb.dto.CoffeeLogResponseDto;
import com.gongBG.myWeb.service.CoffeeLogService;
import com.gongBG.myWeb.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hobby/coffeeLog")
@RequiredArgsConstructor
public class CoffeeLogController {
    private final CoffeeLogService coffeeLogService;
    private final UserService userService;
    @GetMapping
    public List<CoffeeLogListResponseDto> getLogs() {
        return coffeeLogService.getLogs();
    }

    @GetMapping("/{logId}")
    public CoffeeLogResponseDto getLog(@PathVariable Long logId) {
        return coffeeLogService.getLog(logId);
    }

    @PostMapping
    public Long saveLog(@RequestBody CoffeeLogRequestDto requestDto,
                        @RequestAttribute(name = "loginUser") String uid) {
        User loginUser = userService.findByUid(uid)
                        .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));
        return coffeeLogService.saveLog(loginUser, requestDto);
    }

    @PutMapping("/{logId}")
    public void updateLog(@RequestBody CoffeeLogRequestDto requestDto,
                          @PathVariable Long logId,
                          @RequestAttribute(name = "loginUser") String uid) {
        User loginUser = userService.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));
        coffeeLogService.updateLog(loginUser, logId, requestDto);
    }

    @DeleteMapping("/{logId}")
    public void deleteLog(@PathVariable Long logId,
                          @RequestAttribute(name = "loginUser") String uid) {
        User loginUser = userService.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));
        coffeeLogService.deleteLog(loginUser, logId);
    }
}
