import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { UserSignupRequest, ChangePasswordRequest } from "../../../../../pana-tutor-lib/model/user/user-auth.interface";
import { BaseFormGroup } from "../../shared/base-form-group";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { ErrorMessage } from "./../../enum/message.enum";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent extends BaseFormGroup implements OnInit {

  @Input() profileInp: UserSignupRequest;
  profile: UserSignupRequest;
  id: any;
  currentUser:any;

  passwordUpdateForm = new FormGroup({
    password: new FormControl("", [
      Validators.required
    ]),
    new_password: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
    confirm_password: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ])
  });

  constructor(private authService: AuthService,
    private userService: UserService) {
    super();
    super.setForm(this.passwordUpdateForm);
  }

  ngOnInit(): void {
    this.profile = this.profileInp;
  }

  onSubmit() {
    console.log(this.passwordUpdateForm.value);
    if(this.isFormValid()) {
      let reqObj: ChangePasswordRequest = this.mapFormData();
      this.disableForm();
      this.userService.changePassword(reqObj)
        .subscribe( (res) => {
          this.passwordUpdateForm.reset();
          console.log("passwordUpdate response", res);
          this.submitMessage = "Password Update Successful."
          }, (err) => {
            console.log("passwordUpdate Error", err);
            if(err.error && err.error.message){
              if(err.error.detail.includes("ip_blocked")){
                this.formErrors.push(ErrorMessage.AUTH_IP_BLOCKED);
              } else {
                this.formErrors.push(err.error.message);
              }
            } else {
              this.formErrors.push("Error Updating Password - Please try again.");
            }
            this.enableForm();
          }, () => {
            this.enableForm();
          }
        );
    }
  }

  isFormValid(){
    let isFormValid = true;
    this.formErrors = [];
    if(this.passwordUpdateForm.value.password.trim() == this.passwordUpdateForm.value.new_password.trim() ){
      this.formErrors.push("Error - Password has not changed");
      isFormValid = false;
    }
    else if(this.passwordUpdateForm.value.new_password.trim() != this.passwordUpdateForm.value.confirm_password.trim() ){
      this.formErrors.push("Error - New Password & Confirm Password do not much");
      isFormValid = false;
    }
    return isFormValid;
  }

  mapFormData(): ChangePasswordRequest {
    return {
      email: this.profile.email,
      new_password: this.passwordUpdateForm.value.new_password.trim(),
      password: this.passwordUpdateForm.value.password.trim(),
    } as ChangePasswordRequest;
  }

}
