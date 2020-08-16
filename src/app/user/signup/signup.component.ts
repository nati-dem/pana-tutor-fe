import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserSignupRequest } from "./../../../../../pana-tutor-lib/model/user/user-auth.interface";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { BaseFormGroup } from "../../shared/base-form-group";
import { UserRole } from "../../../../../pana-tutor-lib/enum/user.enum";
import { randomString } from "./../../util/helper";
import { from } from "rxjs";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from "angularx-social-login";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["../../shared/shared-css.css"],
})
export class SignupComponent extends BaseFormGroup implements OnInit {
  public user: any = SocialUser;
  signupForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.minLength(4)]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
    password2: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    phone: new FormControl("", [Validators.required, Validators.minLength(4)]),
  });

  // passwordForm = new FormGroup({
  //   password: new FormControl("", [Validators.required]),
  //   password2: new FormControl("", [Validators.required]),
  // });

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {
    super();
    console.log("inside signupcomp const");
    super.setForm(this.signupForm);
  }

  ngOnInit(): void {}

  onSubmit() {
    // TODO: validate password equality, phone number format
    console.warn(this.signupForm.value);
    let signupReq: UserSignupRequest = this.mapFormData();
    this.disableForm();
    this.authService.signup(signupReq).subscribe(
      (res) => {
        this.signupForm.reset();
        console.log("Signup response", res);
      },
      (err) => {
        console.log("Signup Error", err);
        this.formErrors.push(err.error.message);
        this.enableForm();
      },
      () => {
        this.enableForm();
      }
    );
  }

  mapFormData(): UserSignupRequest {
    const email = this.signupForm.value.email.trim();
    return {
      name: this.signupForm.value.name.trim(),
      username: randomString(12),
      email: email,
      password: this.signupForm.value.password.trim(),
      roles: [UserRole.SUBSCRIBER], // TODO - should be determined bsaed on signup form
      meta: {
        phone_number: this.signupForm.value.phone.trim(),
      },
    } as UserSignupRequest;
  }

  submit() {}
  //

  mapGoogleData(): UserSignupRequest {
    return {
      email: this.user.email,
      // password: this.passwordForm.value.password.trim(),
      first_name: this.user.firstName,
      last_name: this.user.lastName,
      username: this.user.name,
      name: this.user.name,
      roles: [UserRole.SUBSCRIBER],
    } as UserSignupRequest;
  }

  signUpWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log("google login", res);
        // this.openVerticallyCentered(targetModal);
        this.user = res;

        let signupReq: UserSignupRequest = this.mapGoogleData();
        console.log("signupGoogle req", signupReq);
        this.authService.signup(signupReq).subscribe(
          (res) => {
            // this.signupForm.reset();
            console.log("Signup response", res);
          },
          (err) => {
            console.log("Signup Error", err);
            // this.formErrors.push(err.error.message);
            // this.enableForm();
          },
          () => {
            // this.enableForm();
          }
        );
      });
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

  openVerticallyCentered(targetModal) {
    this.modalService.open(targetModal, {
      centered: false,
      size: "xl",
      backdrop: "static",
      keyboard: false,
    }); //scrollable:true
  }
}
