package com.gongBG.first.service;

import com.gongBG.first.domain.User;
import com.gongBG.first.dto.LoginRequestDto;
import com.gongBG.first.dto.SignUpRequestDto;
import com.gongBG.first.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void signup(SignUpRequestDto requestDto) {
        String userid = requestDto.getUserid();
        String password = requestDto.getPassword();

        if (userRepository.findByUserid(userid).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        User user = new User(userid, password);

        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public void login(LoginRequestDto requestDto) {
        String userid = requestDto.getUserid();
        String password = requestDto.getPassword();

        User user = userRepository.findByUserid(userid).orElseThrow(
                () -> new IllegalArgumentException("등록된 사용자가 없습니다.")
        );

        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
    }
}
