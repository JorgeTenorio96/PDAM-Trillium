import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string | undefined;
  password: string | undefined;
  verifyPassword: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  verifyEmail: string | undefined;

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    if (this.password !== this.verifyPassword) {
      console.error('Las contraseñas no coinciden');

      return;
    }

    if (this.email !== this.verifyEmail) {
      console.error('Los correos electrónicos no coinciden');

      return;
    }

    const registerData = {
      username: this.username,
      password: this.password,
      fullName: this.fullName,
      email: this.email
    };

    this.http.post<any>('http://localhost:8080/auth/register', registerData).subscribe({
      next: (response) => {

        this.router.navigateByUrl('/login');
      },
      error: (error) => {

        console.error('Error al registrar usuario:', error);

      },
    });
  }
}
