import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { UserSignupRequest } from "../../../../../pana-tutor-lib/model/user/user-auth.interface";
import { BaseFormGroup } from "../../shared/base-form-group";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";

@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.component.html",
  styleUrls: ["./profile-edit.component.css"],
})
export class ProfileEditComponent extends BaseFormGroup implements OnInit {

  @Input() profileInp: UserSignupRequest;
  @Output() profileEmitter= new EventEmitter<UserSignupRequest>();
  profile: UserSignupRequest;
  id: any;
  currentUser:any;

  profileUpdateForm = new FormGroup({
    nickname: new FormControl("", []),
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    phone: new FormControl("", [Validators.required, Validators.minLength(4)]),
    city: new FormControl("", [Validators.required, Validators.minLength(3)]),
    country: new FormControl("", [Validators.required, Validators.minLength(3)]),
    bio: new FormControl("", []),
  });

  constructor(private authService: AuthService,
    private userService: UserService) {
    super();
    super.setForm(this.profileUpdateForm);
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.profile = this.profileInp;
    this.patchProfileData(this.profile);
  }

  patchProfileData(res){
    this.profileUpdateForm.patchValue({
      name: res.name,
      nickname: res.nickname,
      city: res.address,
      bio: res.bio,
      country: res.country,
      phone: res.phone
    })
  }

  onSubmit() {
    console.warn(this.profileUpdateForm.value);
    let reqObj: UserSignupRequest = this.mapFormData();
    if(Object.keys(reqObj).length > 0){
      this.disableForm();
      this.userService.updateProfile(reqObj).subscribe(
        (res) => {
          //this.profileUpdateForm.reset();
          this.submitMessage = "Profile Update Successful.";
          this.profileEmitter.emit(reqObj);
          console.log("updateProfile response", res);
        }, (err) => {
          console.log("updateProfile Error", err);
          this.formErrors.push(err.error.message);
          this.enableForm();
        }, () => {
          this.enableForm();
        }
      );
    }
  }

  mapFormData(): UserSignupRequest {
    const name = this.getFormValueIfChanged('name', 'name');
    const nickname = this.getFormValueIfChanged('nickname', 'nickname');
    const address = this.getFormValueIfChanged('city', 'address');
    const country= this.getFormValueIfChanged('country', 'country');
    const bio = this.getFormValueIfChanged('bio', 'bio');
    const phone = this.getFormValueIfChanged('phone', 'phone');

    return {
      ...(name ? {name} : {} ),
      ...(nickname ? {nickname} : {} ),
      ...(address ? {address} : {} ),
      ...(country ? {country} : {} ),
      ...(bio ? {bio} : {} ),
      ...(phone ? {phone} : {} ),
    } as UserSignupRequest;
  }

  getFormValueIfChanged(formKey, profileKey){
    const formValue = this.profileUpdateForm.value[formKey] ? this.profileUpdateForm.value[formKey].trim() : null; 
    if( formValue && this.profile[profileKey] != formValue )
      return formValue;
    return null;
  }

}

