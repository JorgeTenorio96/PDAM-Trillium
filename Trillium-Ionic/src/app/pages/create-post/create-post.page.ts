import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage {
  image!: File;
  title: string = '';
  description: string = '';

  constructor(private http: HttpClient, private router: Router, private postService: PostService, private authService: AuthService) {}

  onImageChange(event: any) {
    this.image = event.target.files[0];
  }

  async createPost() {

    const authToken = await this.authService.getAuthToken() as string;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    this.postService.createPost(this.title, this.description, this.image, headers).subscribe(
      (response) => {
        console.log('Post created successfully:', response);
        this.router.navigate(['/posts']);
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }
}
