import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Observable, of } from "rxjs";
import { User, UserRole } from "../model/user.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService{

  constructor(private storage: Storage) {}

  saveAuthToken(token: string) {
    this.storage.set('authToken', token);
  }

  getAuthToken(): Promise<string | null>{
    return this.storage.get('authToken');
  }

  getOwnUser(token: string): Observable<User> {
    const mockUser: User = {
      id: '12345',
      username: 'user1',
      avatar: 'https://preview.redd.it/p6dj64xosm061.png?width=1080&crop=smart&auto=webp&v=enabled&s=571b1cee78f2127ff9a1c17ffd0c8400fbc76fb7',
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      likes: [],
      accountNonExpired: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
      enabled: true,
      roles: [UserRole.ROLE_ADMIN],
      createdAt: new Date(),
      lastPasswordChangeAt: new Date(),
      posts: []
    };
    return of(mockUser)
  }

}
