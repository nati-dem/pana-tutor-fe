import { Component, OnInit, Input } from "@angular/core";
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
    this.disableForm();
    this.userService.updateProfile(reqObj).subscribe(
      (res) => {
        //this.profileUpdateForm.reset();
        this.submitMessage = "Profile Update Successful."
        console.log("updateProfile response", res);
      },
      (err) => {
        console.log("updateProfile Error", err);
        this.formErrors.push(err.error.message);
        this.enableForm();
      },
      () => {
        this.enableForm();
      }
    );
  }

  mapFormData(): UserSignupRequest {
    return {
      name: this.profileUpdateForm.value.name.trim(),
      nickname: this.profileUpdateForm.value.nickname ? this.profileUpdateForm.value.nickname.trim() : '',
      address: this.profileUpdateForm.value.city.trim(),
      country: this.profileUpdateForm.value.country.trim(),
      bio: this.profileUpdateForm.value.bio ? this.profileUpdateForm.value.bio.trim(): '',
      phone: this.profileUpdateForm.value.phone.trim(),
    } as UserSignupRequest;
  }

}

