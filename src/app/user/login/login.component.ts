import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { UserLoginRequest } from "./../../../../../pana-tutor-lib/model/user/user-auth.interface";
import { GlobalService } from "../../service/global.service";
import { Router } from "@angular/router";
import { ErrorResponse } from "./../../../../../pana-tutor-lib/model/api-response.interface";
import { BaseFormGroup } from "../../shared/base-form-group";
import { ErrorMessage } from "./../../enum/message.enum";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["../../shared/shared-css.css"],
})
export class LoginComponent extends BaseFormGroup implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private globalService: GlobalService
  ) {
    super();
    console.log("inside LoginComponent cost");
    super.setForm(this.loginForm);
  }

  ngOnInit(): void {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.warn(this.loginForm.value);
    let userLoginReq: UserLoginRequest = this.getFormData();
    this.disableForm();
    this.authService.authenticate(userLoginReq).subscribe(
      (res) => {
        //console.log("Login response", res);
        this.authService.saveTokenInLocal(res);
        this.authService.notifyAuthObservers(true);
        this.authService.setUserAuthGlobals();
        this.router.navigate(["/profile"]);
      }, (err) => {
        console.log("Login Error", err);
        if(err.error && err.error.detail && err.error.detail.includes("ip_blocked")){
          this.formErrors.push(ErrorMessage.AUTH_IP_BLOCKED);
        } else {
          this.formErrors.push(ErrorMessage.LOGIN_ERROR);
        }
        this.enableForm();
      }, () => {
        this.enableForm();
      }
    );
  }

  getFormData(): UserLoginRequest {
    return {
      username: this.loginForm.value.email.trim(),
      password: this.loginForm.value.password.trim(),
    };
  }
}
