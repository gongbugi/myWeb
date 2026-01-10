package com.gongBG.myWeb.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class CoffeeLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    //원두 기본 정보
    private String country;
    private String region;
    private String variety;
    private String processing;
    private String roastingPoint;

    //리뷰
    @Column(nullable = false)
    private String moodColors;
    private String flavorNotes;
    private String comment;
    @Column(nullable = false)
    private LocalDate drinkDate;

    @Builder
    public CoffeeLog(User user, String name, String country, String region, String variety, String processing,
                     String roastingPoint, String moodColors, String flavorNotes, String comment, LocalDate drinkDate) {
        this.user = user;
        this.name = name;
        this.country = country;
        this.region = region;
        this.variety = variety;
        this.processing = processing;
        this.roastingPoint = roastingPoint;
        this.moodColors = moodColors;
        this.flavorNotes = flavorNotes;
        this.comment = comment;
        this.drinkDate = (drinkDate != null) ? drinkDate : LocalDate.now();
    }
}
