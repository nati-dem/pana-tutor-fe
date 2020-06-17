import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { UserSignupRequest } from "../../../../../pana-tutor-lib/model/user/user-auth.interface";

@Component({
  selector: "app-profile-dash",
  templateUrl: "./profile-dashboard.component.html",
  styleUrls: ["./profile-dashboard.component.css"],
})
export class ProfileDashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}
  profile: any;
  user: any;
  id: any;

  ngOnInit(): void {
    console.log(this.authService.isTokenValid());
    let currentUser = this.authService.decodeToken(
      localStorage.getItem("pana_user_token")
    );
    console.log(
      this.authService.decodeToken(localStorage.getItem("pana_user_token"))
    );
    this.user = this.authService.decodeToken(
      localStorage.getItem("pana_user_token")
    );
    this.getProfile();
    console.log("User", this.user.data.user.id);
    console.log("Current user", currentUser.data.user.id);
    console.log("profile name", this.profile);
    console.log("profil user");
  }

  getProfile() {
    let currentUser = this.authService.decodeToken(
      localStorage.getItem("pana_user_token")
    );
    this.authService
      .getProfileById(currentUser.data.user.id)
      .subscribe((res) => {
        this.profile = res;
      });
  }
}
