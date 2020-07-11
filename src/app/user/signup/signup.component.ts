import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserSignupRequest } from "./../../../../../pana-tutor-lib/model/user/user-auth.interface";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { BaseFormGroup } from "../../shared/base-form-group";
import { UserRole } from "../../../../../pana-tutor-lib/enum/user.enum";
import { randomString } from "./../../util/helper";
import { from } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["../../shared/shared-css.css"],
})
export class SignupComponent extends BaseFormGroup implements OnInit {
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

  constructor(private authService: AuthService, private router: Router) {
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
}
