import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  public isLoggedin: boolean = false;
  public isSuperAdmin: boolean = false;


  ngOnInit() {

    this.refreshAuthenticationStatus();
  }


  constructor(private authService: AuthServiceService) {
  }

  logout() {
    this.authService.logout();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  refreshAuthenticationStatus() {
    this.isLoggedin = this.authService.isLoggedIn();

    let accessToken = this.authService.getAccessToken();
    if (accessToken != null && accessToken == "access_token_superadmin") {
      this.isSuperAdmin = true;
    } else {
      this.isSuperAdmin = false;
    }
  }

  
}
