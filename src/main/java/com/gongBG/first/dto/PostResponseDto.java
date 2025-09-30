package com.gongBG.first.dto;

import com.gongBG.first.domain.Post;
import lombok.Getter;

@Getter
public class PostResponseDto {
    private final Long id;
    private final String title;
    private final String content;
    private final String categoryName;

    public PostResponseDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.categoryName = post.getCategory().getName();
    }
}
