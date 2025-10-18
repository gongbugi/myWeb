package com.gongBG.first.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostRequestDto {
    private String title;
    private String content;
    private Long categoryId;
    private String newCategoryName;
}
