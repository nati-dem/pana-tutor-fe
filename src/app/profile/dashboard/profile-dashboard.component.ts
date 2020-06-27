import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { UserSignupRequest } from "../../../../../pana-tutor-lib/model/user/user-auth.interface";

@Component({
  selector: "app-profile-dash",
  templateUrl: "./profile-dashboard.component.html",
  styleUrls: ["./profile-dashboard.component.css"],
})
export class ProfileDashboardComponent implements OnInit {

  profile: UserSignupRequest;
  id: any;
  currentUser:any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.decodeToken(localStorage.getItem("pana_user_token"));
    this.getProfile();
  }

  getProfile() {
    console.log("User", this.currentUser);
    this.authService
      .getProfileById(this.currentUser.data.user.id)
      .subscribe((res) => {
        this.profile = res;
      });
  }

}
