import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from 'src/app/model/post.model';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer tu_token_de_autenticacion');

    this.http.get<Post[]>('http://localhost:8080/post', { headers })
    .pipe(
      tap((response) => {
        this.posts = response;
      }),
      catchError((error) => {
        console.error('Error al obtener los posts:', error);
        return error;
      })
    )
    .subscribe();
  }
}
