import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../shared/login.model';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  public loginModel: Login = new Login();

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router, private authService: AuthServiceService) { }

  ngOnInit() {

    
  }

 

  hasError: boolean = false;
  errorMessage: string = "";
  isSubmiting: boolean = false;


  validateForm() {

    let isValid = true;

    if (this.loginModel.email == null || this.loginModel.email == "") {
      isValid = false;
    }

    if (this.loginModel.password == null || this.loginModel.password == "") {
      isValid = false;
    }

    return isValid;
  }

  login() {
    this.isSubmiting = true;
    if (this.validateForm()) {
      this.http.post<string>(this.baseUrl + 'api/Login', this.loginModel).subscribe(result => {

        if (result) {
          if (this.loginModel.email == 'superadmin@gmail.com') {
            this.authService.login(this.loginModel);
            console.log("Log in completed!");
            this.router.navigate(['/user-details-page']);
          } else {
            console.log("Log in completed!");
            this.authService.login(this.loginModel);
            this.router.navigate(['/welcome-new-member']);
          }
          this.loginModel = new Login();
        }
        else {
          this.hasError = true;
          this.errorMessage = "Username or password is incorrect!";
          console.log("Log in failed!");
        }
        this.isSubmiting = false;
      }, err => console.log(err));

    }

    
  }

}
