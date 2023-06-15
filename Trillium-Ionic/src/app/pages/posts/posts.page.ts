import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from 'src/app/model/post.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';

interface PostResponse {
  content: Post[];
  totalElements: number;
  totalPages: number;
  page: number;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  @Input() post!: Post;
  posts: Post[] = [];

  constructor(private http: HttpClient, private storage: Storage, private router: Router) {}

  ngOnInit() {
    this.ionViewDidEnter();
  }

  ionViewDidEnter() {
    this.storage
      .get('authToken')
      .then((authToken) => {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);

        this.http
          .get<PostResponse>('http://localhost:8080/post/', { headers })
          .subscribe({
            next: (response) => {
              this.posts = response.content; // Asigna el array "content" de la respuesta a "posts"
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

  viewPostDetails(postId: number) {
    this.router.navigate(['/post-details', postId]);
  }

}
