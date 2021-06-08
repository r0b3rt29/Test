import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../shared/user.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Register } from '../shared/register.model';

@Component({
  selector: 'app-user-details-list',
  templateUrl: './user-details-list.component.html',
  styleUrls: ['./user-details-list.component.css']
})
export class UserDetailsListComponent implements OnInit {
  public users: User[];
  public user: User = new User();
  formData: Register = new Register();
  url: string;

  firstNameError: boolean = false;
  lastNameError: boolean = false;
  emailNameError: boolean = false;
  passwordNameError: boolean = false;
  confirmPasswordNameError: boolean = false;
  passwordAndConfirmPasswordError: boolean = false;

  isFormSubmiting: boolean = false;
  didSubmitOperationFailed: boolean = false;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.url = baseUrl + 'api/User';
    this.autoPopulate();
  }

  autoPopulate() {
    this.http.get<User[]>(this.baseUrl + 'api/User').subscribe(result => {
      this.users = result;
    }, error => console.log(error));
  }

  onEdit(user: User, formUpdate: NgForm) {
    formUpdate.form.reset();
    this.user = user;
  }

  onView(user: User) {
    this.user = user;
  }

  onUpdate(formUpdate: NgForm) {
    this.http.put(this.url + '/' + this.user.id, this.user).subscribe(result => {
      if (result) {
        formUpdate.form.reset();
        $('#myModal').modal('hide');
        console.log("Update completed!");
        this.autoPopulate();
      } else {
        console.log("Update failed!");
      }
    }, err => console.log(err));
  }

  onDelete(userId: number) {
    this.http.delete(this.url + '/' + userId).subscribe(result => {
      if (result) {
        console.log("Delete completed!");
        this.autoPopulate();
      } else {
        console.log("Delete failed!");
      }
    }, err => console.log(err));
  }

  onAdd(form: NgForm) {

    this.resetForm(form);
    this.resetErrors();
  }

  createUser(form: NgForm) {
    let url = this.baseUrl + 'api/User';
    this.isFormSubmiting = true;

    if (this.validateForm()) {
      this.passwordAndConfirmPasswordError = false;
      this.formData.confirmPassword = this.formData.password;
      this.http.post(url, this.formData).subscribe(result => {
        if (result) {
          console.log("Successful!");
          this.resetForm(form);
          this.isFormSubmiting = false;
          this.didSubmitOperationFailed = false;
          this.resetErrors();
          this.autoPopulate();
          $('#addUserModal').modal('hide');
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

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new Register();
  }

  resetErrors() {

    this.firstNameError = false;
    this.lastNameError = false;
    this.emailNameError = false;
    this.passwordNameError = false;
    this.confirmPasswordNameError = false;
    this.passwordAndConfirmPasswordError = false;

    this.isFormSubmiting = false;
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

    return result;
  }

  closeModal() {
    this.user = new User();
  }

  ngOnInit() {
  }

}
