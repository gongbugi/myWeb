package com.gongBG.myWeb.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class CoffeeLog extends BaseTimeEntity{
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

    @Builder
    public CoffeeLog(User user, String name, String country, String region, String variety, String processing,
                     String roastingPoint, String moodColors, String flavorNotes, String comment) {
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
    }

    public void update(String name, String country, String region, String variety, String processing,
                       String roastingPoint, String moodColors, String flavorNotes, String comment) {
        this.name = name;
        this.country = country;
        this.region = region;
        this.variety = variety;
        this.processing = processing;
        this.roastingPoint = roastingPoint;
        this.moodColors = moodColors;
        this.flavorNotes = flavorNotes;
        this.comment = comment;
    }
}
