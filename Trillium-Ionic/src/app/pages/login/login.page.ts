import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string | undefined;
  password: string | undefined;

  constructor(private router: Router, private http: HttpClient, private storage: Storage) { }

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password,
    };

    this.http.post<any>('http://localhost:8080/auth/login', loginData).subscribe({
      next: (response) => {
        const token = response.token;

        this.storage.set('authToken', token)
          .then(() => {
            this.router.navigateByUrl('/posts');
          })
          .catch((error) => {
            console.error('Error al guardar el token:', error);
          });
      },
      error: (error) => {
        console.error('Error de inicio de sesión:', error);
      },
    });
  }

}


