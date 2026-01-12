package com.gongBG.myWeb.service;

import com.gongBG.myWeb.domain.CoffeeLog;
import com.gongBG.myWeb.domain.Role;
import com.gongBG.myWeb.domain.User;
import com.gongBG.myWeb.dto.CoffeeLogListResponseDto;
import com.gongBG.myWeb.dto.CoffeeLogRequestDto;
import com.gongBG.myWeb.dto.CoffeeLogResponseDto;
import com.gongBG.myWeb.repository.CoffeeLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoffeeLogService {

    private final CoffeeLogRepository coffeeLogRepository;

    @Transactional(readOnly = true)
    public List<CoffeeLogListResponseDto> getLogs() {
        return coffeeLogRepository.findAllByOrderByIdDesc().stream()
                .map(CoffeeLogListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CoffeeLogResponseDto getLog(Long logId) {
        CoffeeLog coffeeLog = coffeeLogRepository.findById(logId)
                .orElseThrow(() -> new IllegalArgumentException("해당 기록이 없습니다. id=" + logId));
        return new CoffeeLogResponseDto(coffeeLog);
    }

    @Transactional
    public Long saveLog(User user, CoffeeLogRequestDto requestDto) {
        if(user.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("기록 작성 권한이 없습니다.");
        }
        return coffeeLogRepository.save(requestDto.toEntity(user)).getId();
    }

    @Transactional
    public void deleteLog(User user, Long logId) {
        if(user.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("기록 삭제 권한이 없습니다.");
        }
        CoffeeLog coffeeLog = coffeeLogRepository.findById(logId)
                .orElseThrow(() -> new IllegalArgumentException("해당 기록이 없습니다. id=" + logId));
        coffeeLogRepository.delete(coffeeLog);
    }

    @Transactional
    public void updateLog(User user, Long logId, CoffeeLogRequestDto requestDto) {

        if(user.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("기록 수정 권한이 없습니다.");
        }

        CoffeeLog coffeeLog = coffeeLogRepository.findById(logId)
                .orElseThrow(() -> new IllegalArgumentException("해당 기록이 없습니다. id=" + logId));

        coffeeLog.update(
                requestDto.getName(),
                requestDto.getCountry(),
                requestDto.getRegion(),
                requestDto.getVariety(),
                requestDto.getProcessing(),
                requestDto.getRoastingPoint(),
                requestDto.getMoodColors(),
                requestDto.getFlavorNotes(),
                requestDto.getComment()
        );
    }
}
