import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/model/post.model';

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
    this.http.get<Post[]>('http://localhost:8080/post').subscribe(
      (response) => {

        this.posts = response;
      },
      (error) => {

        console.error('Error al obtener los posts:', error);

      }
    );
  }

}
