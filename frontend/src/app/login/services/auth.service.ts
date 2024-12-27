import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) {}

  async login(username: string, password: string) {
    const loginData = {
        username,
        password
    };
    const user: any = await firstValueFrom(this.http.post(environment.apiUrl + "/auth/login", loginData));
    //save the token in the local storage
    localStorage.setItem('token', user['token']);
    return user;
  }

  getToken(){
    return localStorage.getItem('token');
  }
}