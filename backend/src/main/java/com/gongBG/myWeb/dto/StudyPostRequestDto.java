package com.gongBG.myWeb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudyPostRequestDto {
    private String title;
    private String content;
    private Long categoryId;
    private String newCategoryName;
}
