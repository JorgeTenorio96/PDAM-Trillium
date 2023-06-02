import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

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

}
