import { Component } from '@angular/core';
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
    { title: 'Profile', url: '/folder/profile', icon: 'person' },
    { title: 'Log Out', url: '/login', icon: 'log-out' },
  ];
  public labels = [];


  constructor(private storage:Storage) {}

  ngOnInit() {
    this.initializeApp();
  }

  async initializeApp(){
    await this.storage.create();
  }
}
