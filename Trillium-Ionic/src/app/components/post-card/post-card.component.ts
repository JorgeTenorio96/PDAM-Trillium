import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent  implements OnInit {

  @Input() post!: Post;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts();
  }

}
