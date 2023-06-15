import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  public appPages = [
    { title: 'Posts', url: '/posts', icon: 'mail' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Profile', url: '/profile', icon: 'person' },
  ];
  public labels = [];


  constructor(private storage:Storage, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.initializeApp();
  }

  async initializeApp(){
    await this.storage.create();
  }

  logout() {
    this.storage.get('token').then((token) => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.post<any>('http://localhost:8080/auth/logout', {}, { headers }).subscribe({
        next: () => {
          this.storage.remove('token').then(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (error) => {
          console.log('Error al hacer logout:', error);
        }
      });
    });
  }



}
