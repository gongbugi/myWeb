package com.gongBG.myWeb.dto;


import com.gongBG.myWeb.domain.CoffeeLog;
import lombok.Getter;

@Getter
public class CoffeeLogListResponseDto {
    private final Long id;
    private final String name;
    private final String flavorNotes;
    private final String moodColors;

    public CoffeeLogListResponseDto(CoffeeLog entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.flavorNotes = entity.getFlavorNotes();
        this.moodColors = entity.getMoodColors();
    }
}
