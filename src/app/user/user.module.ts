import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { UserRoutingModule } from "./user-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LogoutComponent } from "./logout/logout.component";
import { SharedModule } from "../shared/shared.module";
import { UserSearchComponent } from "./user-search/user-search.component";
import { PublicProfileComponent } from "./public-profile/public-profile.component";
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthService,
} from "angularx-social-login";

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    SignupComponent,
    LogoutComponent,
    UserSearchComponent,
    PublicProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "613115898435-da6kdpbtmk4c61orf9s3jg0h5u1bhqj1.apps.googleusercontent.com"
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("clientId"),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
})
export class UserModule {}
