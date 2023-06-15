import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  user$!: Observable<User>
  posts$!: Observable<Post[]>
  headers!: HttpHeaders;

  constructor(private authService: AuthService, private postsService: PostService) { }

  ngOnInit() {
    this.getUser();
  }

  async getUser(): Promise<void> {
    const authToken = await this.authService.getAuthToken() as string;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    this.headers = headers;
    this.user$ = this.authService.getOwnUser(authToken).pipe(
      tap(user => this.posts$ = this.getPosts(user.username))
    );
  }

  getPosts(author: string): Observable<Post[]> {
    return this.postsService.getPosts(this.headers).pipe(
      map(posts => posts.content.filter(p => p.author === author))
    );
  }

}
