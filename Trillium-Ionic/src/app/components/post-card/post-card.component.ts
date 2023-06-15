import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent  implements OnInit {

  @Input() post!: Post;

  isLiked: boolean = false;

  constructor(private postService: PostService, private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.postService.getPosts();
  }
  viewPostDetails(postId: number) {
    this.router.navigate(['/post-details', postId]);
  }

  async like() {
    const postId = this.post.id;
    const authToken = await this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    this.postService.likePost(postId, headers).subscribe(response => {
      this.isLiked = !this.isLiked;
      console.log('¡Like dado!');
    })
  }

}
