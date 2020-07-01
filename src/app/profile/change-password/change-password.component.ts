import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { UserSignupRequest, ChangePasswordRequest } from "../../../../../pana-tutor-lib/model/user/user-auth.interface";
import { BaseFormGroup } from "../../shared/base-form-group";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";

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
      this.userService.changePassword(reqObj).subscribe(
        (res) => {
          this.passwordUpdateForm.reset();
          console.log("passwordUpdate response", res);
          this.submitMessage = "Password Update Successful."
        }, (err) => {
          console.log("passwordUpdate Error", err);
          this.formErrors.push(err.error.message);
          this.enableForm();
        }, () => {
          this.enableForm();
        }
      );
    }
  }

  isFormValid(){
    if(this.passwordUpdateForm.value.new_password.trim() != this.passwordUpdateForm.value.confirm_password.trim() ){
      this.formErrors = [];
      this.formErrors.push("Error - New Password & Confirm Password do not much");
      return false;
    }
    return true;
  }

  mapFormData(): ChangePasswordRequest {
    return {
      email: this.profile.email,
      new_password: this.passwordUpdateForm.value.new_password.trim(),
      password: this.passwordUpdateForm.value.password.trim(),
    } as ChangePasswordRequest;
  }

}
