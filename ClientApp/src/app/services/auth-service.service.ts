import { Injectable } from '@angular/core';
import { Login } from '../shared/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router) { }

  public login(userInfo: Login) {
    if (userInfo.email == "superadmin@gmail.com") {
      localStorage.setItem('ACCESS_TOKEN', "access_token_superadmin");
    } else {
      localStorage.setItem('ACCESS_TOKEN', "access_token_member");
    }
    
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;

  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    this.router.navigate(['/login-page']);
  }

  public getAccessToken() {
    let accessToken = "";
    if (this.isLoggedIn()) {
      accessToken = localStorage.getItem('ACCESS_TOKEN');
    }
    return accessToken;
  }
}
