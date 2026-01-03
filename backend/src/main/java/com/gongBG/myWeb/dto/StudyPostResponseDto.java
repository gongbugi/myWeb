package com.gongBG.myWeb.dto;

import com.gongBG.myWeb.domain.StudyPost;
import lombok.Getter;

@Getter
public class StudyPostResponseDto {
    private final Long id;
    private final String title;
    private final String content;
    private final String categoryName;
    private final Long categoryId;

    public StudyPostResponseDto(StudyPost studyPost) {
        this.id = studyPost.getId();
        this.title = studyPost.getTitle();
        this.content = studyPost.getContent();
        this.categoryName = studyPost.getCategory().getName();
        this.categoryId = studyPost.getCategory().getId();
    }
}
