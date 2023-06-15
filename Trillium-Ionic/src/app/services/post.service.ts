import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Post, PostsResponse } from "../model/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

      getPosts(headers?: HttpHeaders): Observable<PostsResponse> {
        const options = { headers };
        return this.http.get<PostsResponse>('http://localhost:8080/post/', options);
      }

      getPost(id: number, headers?: HttpHeaders): Observable<Post> {
        const options = { headers };
        return this.http.get<Post>(`http://localhost:8080/post/${id}`, options);
      }

      likePost(id: number, headers?: HttpHeaders): Observable<unknown> {
        const options = { headers };
        console.log(options);
        return this.http.post(`http://localhost:8080/post/like/${id}`, null, options);
      }
}
