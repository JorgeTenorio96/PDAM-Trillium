package com.salesianostriana.edu.trillium.post.dto;

import com.salesianostriana.edu.trillium.user.dto.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePostDto {

    private String title;

    private String desc;

    private byte[] image;

}
