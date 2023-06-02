import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../model/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private storage: Storage) { }

  /*this.storage
    .get('authToken')
    .then((authToken) => {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);
      this.postService.getPosts().subscribe(response => {
        this.posts = response
      })*/
      getPosts(headers?: HttpHeaders): Observable<Post[]> {
        const options = { headers };
        return this.http.get<Post[]>('http://localhost:8080/post', options);
      }
}
