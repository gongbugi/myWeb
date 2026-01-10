package com.gongBG.myWeb.dto;

import com.gongBG.myWeb.domain.CoffeeLog;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
public class CoffeeLogResponseDto {
    private final Long id;
    private final String name;
    private final String country;
    private final String region;
    private final String variety;
    private final String processing;
    private final String roastingPoint;
    private final String moodColors;
    private final String flavorNotes;
    private final String comment;
    private final LocalDate drinkDate;

    public CoffeeLogResponseDto(CoffeeLog entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.country = entity.getCountry();
        this.region = entity.getRegion();
        this.variety = entity.getVariety();
        this.processing = entity.getProcessing();
        this.roastingPoint = entity.getRoastingPoint();
        this.moodColors = entity.getMoodColors();
        this.flavorNotes = entity.getFlavorNotes();
        this.comment = entity.getComment();
        this.drinkDate = entity.getDrinkDate();
    }
}
