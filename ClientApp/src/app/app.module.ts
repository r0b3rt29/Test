import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TestComponent } from './test/test.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailsListComponent } from './user-details-list/user-details-list.component';
import { InsideSystemComponent } from './inside-system/inside-system.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TestComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    UserListComponent,
    UserDetailComponent,
    UserDetailsComponent,
    UserDetailsListComponent,
    InsideSystemComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login-page', component: LoginPageComponent },
      { path: 'registration-page', component: RegistrationPageComponent },
      { path: 'user-details-page', component: UserDetailsComponent, canActivate: [AuthGuard] },
      { path: 'welcome-new-member', component: InsideSystemComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
