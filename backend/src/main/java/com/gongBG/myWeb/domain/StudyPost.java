package com.gongBG.myWeb.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class StudyPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public StudyPost(String title, String content, Category category, User user) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.user = user;
    }

    public void update(String title, String content, Category category){
        this.title = title;
        this.content = content;
        this.category = category;
    }
}