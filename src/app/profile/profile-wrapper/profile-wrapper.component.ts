import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { UserSignupRequest } from "../../../../../pana-tutor-lib/model/user/user-auth.interface";
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-profile-wrapper",
  templateUrl: "./profile-wrapper.component.html",
  styleUrls: ["./profile-wrapper.component.css"],
})
export class ProfileWrapperComponent implements OnInit {

  profile: UserSignupRequest;
  id: any;
  currentUser:any;
  page='dashboard';
  menuItems = new Set(['edit', 'change-passwrod', 'dashboard', 'avatar'])

  constructor(private authService: AuthService,
    private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.decodeToken(localStorage.getItem("pana_user_token"));
    this.getProfile();
    this.route.queryParams.subscribe((params) => {
      this.page = params.page; // && params.page ? params.page: 'dashboard';
      if(!this.menuItems.has(this.page)){
        this.page = 'dashboard'
      }
    });
  }

  getProfile() {
    this.authService
      .getProfileById(this.currentUser.data.user.id)
      .subscribe((res) => {
        this.profile = res;
        console.log("User", this.profile);
      }, err => {
        console.log("Profile API Err", err);
      });
  }

  onProfileEventEmitter(profileEvt: UserSignupRequest){
    console.log('onProfileEventEmitter:', profileEvt)
    for (const k in profileEvt) {
      if(profileEvt[k]){
        this.profile[k] = profileEvt[k];
      }
    }
  }

}

