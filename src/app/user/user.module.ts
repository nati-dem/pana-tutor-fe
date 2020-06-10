import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedModule } from '../shared/shared.module';
import { UserSearchComponent } from './user-search/user-search.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    SignupComponent,
    LogoutComponent,
    UserSearchComponent,
    PublicProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule { }
