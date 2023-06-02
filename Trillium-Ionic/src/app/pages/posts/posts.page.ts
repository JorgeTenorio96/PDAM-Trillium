import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from 'src/app/model/post.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts: Post[] = [];

  constructor(private http: HttpClient, private storage: Storage, ) {}

  ngOnInit() {
    this.ionViewDidEnter();
  }

  /*getPosts() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ');

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
  }*/

  ionViewDidEnter() {
    this.storage
      .get('authToken')
      .then((authToken) => {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);

        this.http
          .get<Post[]>('http://localhost:8080/post/', { headers })
          .subscribe({
            next: (response) => {
              this.posts = response;
              console.log(this.posts)
            },
            error: (error) => {
              console.error('Error al obtener los posts:', error);
            },
          });
      })
      .catch((error) => {
        console.error('Error al obtener el token:', error);
      });
  }
}
