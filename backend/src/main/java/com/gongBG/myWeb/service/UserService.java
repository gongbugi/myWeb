package com.gongBG.myWeb.service;

import com.gongBG.myWeb.domain.User;
import com.gongBG.myWeb.dto.LoginRequestDto;
import com.gongBG.myWeb.dto.SignUpRequestDto;
import com.gongBG.myWeb.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void signup(String uid) {
        if (userRepository.findByUid(uid).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        User user = new User(uid);
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public void login(String uid) {
        User user = userRepository.findByUid(uid).orElseThrow(
                () -> new IllegalArgumentException("등록된 사용자가 없습니다.")
        );
    }
}
