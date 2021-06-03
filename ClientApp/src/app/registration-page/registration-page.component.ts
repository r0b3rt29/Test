import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Register } from '../shared/register.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { }

  formData: Register = new Register();
  isCreateUserSuccessful: boolean = false;
  didSubmitOperationFailed: boolean = false;
  isFormSubmiting: boolean = false;
  isFormSubmitted: boolean = false;

  //firstNameErrorMessage: string = "";
  //lastNameErrorMessage: string = "";
  //emailNameErrorMessage: string = "";
  //passwordNameErrorMessage: string = "";
  confirmPasswordNameErrorMessage: string = "";

  firstNameError: boolean = false;
  lastNameError: boolean = false;
  emailNameError: boolean = false;
  passwordNameError: boolean = false;
  confirmPasswordNameError: boolean = false;
  passwordAndConfirmPasswordError: boolean = false;


  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let url = this.baseUrl + 'api/User';
    this.isFormSubmiting = true;

    if (this.validateForm()) {
      this.passwordAndConfirmPasswordError = false;
      this.http.post(url, this.formData).subscribe(result => {
        if (result) {
          console.log("Successful!");
          this.resetForm(form);
          this.isCreateUserSuccessful = true;
          this.isFormSubmiting = false;
          this.didSubmitOperationFailed = false;
          this.resetErrors();
          setTimeout(() => {
            this.didSubmitOperationFailed = false;
            this.router.navigate(['/login-page']);
          }, 3000);

        } else {
          this.isFormSubmiting = false;
          this.didSubmitOperationFailed = true;
          console.log("Process Failed!");
        }

      }, err => {
        console.log(err);
        this.isFormSubmiting = false;
        this.didSubmitOperationFailed = true;
      });
    } else {
      this.isFormSubmiting = false;
    }

  }

  validateForm() {
    let result = true;
    

    if (this.formData.firstName == '' || this.formData.firstName == null) {
      this.firstNameError = true;
      result = false;
    }
    if (this.formData.lastName == '' || this.formData.lastName == null) {
      this.lastNameError = true;
      result = false;
    }
    if (this.formData.email == '' || this.formData.email == null) {
      this.emailNameError = true;
      result = false;
    }
    if (this.formData.password == '' || this.formData.password == null) {
      this.passwordNameError = true;
      result = false;
    }
    if (this.formData.confirmPassword == '' || this.formData.confirmPassword == null) {
      this.confirmPasswordNameError = true;
      result = false;
    }
    if ((this.formData.password != '' || this.formData.password == null) && (this.formData.confirmPassword != '' || this.formData.confirmPassword != null)) {
      if (this.formData.password != this.formData.confirmPassword) {
        this.passwordAndConfirmPasswordError = true;
        result = false;
      }
    }
    this.isFormSubmitted = true;
    return result;
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new Register();
  }

  resetErrors() {
    this.confirmPasswordNameErrorMessage = "";

    this.firstNameError = false;
    this.lastNameError = false;
    this.emailNameError = false;
    this.passwordNameError = false;
    this.confirmPasswordNameError = false;
    this.passwordAndConfirmPasswordError = false;

    this.isFormSubmitted = false;

  }

}
