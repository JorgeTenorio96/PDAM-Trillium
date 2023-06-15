import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent  implements OnInit {

  post$!: Observable<Post>;

  constructor(private postService: PostService, private authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        const id = Number(params.get('id'));
        this.getPost(id);
      }
    )
  }

  async getPost(id: number): Promise<void> {
    const authToken = await this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    this.post$ = this.postService.getPosts(headers).pipe(
      map(posts => posts.content.find(p => p.id === id) as Post)
    );
  }

  ngOnInit() {}

}
