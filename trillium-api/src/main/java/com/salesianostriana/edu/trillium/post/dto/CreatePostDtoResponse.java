package com.salesianostriana.edu.trillium.post.dto;


import com.salesianostriana.edu.trillium.post.model.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePostDtoResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String title;

    private String desc;

    private String image;

    public static CreatePostDtoResponse toCreatePostResponse(Post post){
        return CreatePostDtoResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .image(post.getImage())
                .desc(post.getDesc())
                .build();
    }

}
