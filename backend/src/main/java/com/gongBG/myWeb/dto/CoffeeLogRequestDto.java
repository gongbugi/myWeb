package com.gongBG.myWeb.dto;

import com.gongBG.myWeb.domain.CoffeeLog;
import com.gongBG.myWeb.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CoffeeLogRequestDto {
    private String name;
    private String country;
    private String region;
    private String variety;
    private String processing;
    private String roastingPoint;

    private String moodColors;
    private String flavorNotes;
    private String comment;

    private LocalDate drinkDate;

    public CoffeeLog toEntity(User user) {
        return CoffeeLog.builder()
                .user(user)
                .name(this.name)
                .country(this.country)
                .region(this.region)
                .variety(this.variety)
                .processing(this.processing)
                .roastingPoint(this.roastingPoint)
                .moodColors(this.moodColors)
                .flavorNotes(this.flavorNotes)
                .comment(this.comment)
                .drinkDate(this.drinkDate)
                .build();
    }
}
