package com.salesianostriana.edu.trillium.post.controller;

import com.salesianostriana.edu.trillium.comment.dto.PageResponse;
import com.salesianostriana.edu.trillium.post.dto.CreatePostDto;
import com.salesianostriana.edu.trillium.post.dto.CreatePostDtoResponse;
import com.salesianostriana.edu.trillium.post.dto.PostResponse;
import com.salesianostriana.edu.trillium.post.model.Post;
import com.salesianostriana.edu.trillium.post.service.PostService;
import com.salesianostriana.edu.trillium.user.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService service;

    @Operation(summary = "Este método muestra los posts")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Se ha encontrado los posts",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = PostResponse.class)),
                            examples = @ExampleObject(value = """
                             
                                    """
                            ))}),
            @ApiResponse(responseCode = "404",
                    description = "No se ha encontrado ningun post",
                    content = @Content),
    })
    @GetMapping("/")
    public PageResponse<PostResponse> getAll(@RequestParam(value = "search", defaultValue = "") String search,
                                             @PageableDefault(size = 20, page = 0) Pageable pageable) {

        PageResponse<PostResponse> result = service.findAll(search, pageable);

        return result;
    }
    @Operation(summary = "Este método publica un post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Se ha publicado el post",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = PostResponse.class)),
                            examples = @ExampleObject(value = """
                             
                                    """
                            ))}),
            @ApiResponse(responseCode = "404",
                    description = "No se ha encontrado ningun post",
                    content = @Content),
    })
    /*@PostMapping("/")
    public ResponseEntity<CreatePostDtoResponse> create(
            @RequestPart("file") MultipartFile file,
            @RequestPart("post") CreatePostDto newPost,
    ) {
        CreatePostDtoResponse post = service.save(newPost,file,);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(post);
    }*/

    @PostMapping("/post")
    public ResponseEntity<CreatePostDtoResponse> newPost(@RequestPart("post")@Valid CreatePostDto createPostDto, @RequestPart("file") MultipartFile file, @AuthenticationPrincipal User loggedUser){
        CreatePostDtoResponse postNew = service.save(createPostDto, file, loggedUser);

        URI createdURI = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(postNew.getId()).toUri();

        return ResponseEntity.created(createdURI).body(postNew);

    }
    @Operation(summary = "Este método le da like a un post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Se ha dado like al post",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = PostResponse.class)),
                            examples = @ExampleObject(value = """
                             
                                    """
                            ))}),
            @ApiResponse(responseCode = "400",
                    description = "No se ha dado like al post",
                    content = @Content),
    })
    @PostMapping("/like/{id}")
    public ResponseEntity<PostResponse> likePost (@PathVariable Long id, @AuthenticationPrincipal User user){
        return ResponseEntity.status(HttpStatus.CREATED).body(PostResponse.toPostResponse(service.liked(id, user)));
    }

}
