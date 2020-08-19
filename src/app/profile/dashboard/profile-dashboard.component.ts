import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { UserSignupRequest } from "../../../../../pana-tutor-lib/model/user/user-auth.interface";
import { GlobalService } from "../../service/global.service";
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-profile-dash",
  templateUrl: "./profile-dashboard.component.html",
  styleUrls: ["./profile-dashboard.component.css"],
})
export class ProfileDashboardComponent implements OnInit {

  @Input() profileInp: UserSignupRequest;
  profile: UserSignupRequest;
  id: any;
  currentUser:any;
  courses = [];

  constructor(private authService: AuthService, 
    private router: Router,
    private categoryService: CategoryService) {}

  ngOnInit(): void {
    //this.currentUser = this.authService.decodeToken(localStorage.getItem("pana_user_token"));
    //this.getProfile();
    this.profile = this.profileInp;

    if(GlobalService.courses && Array.isArray(GlobalService.courses)) {
      if(GlobalService.courses.length == 0){
        this.router.navigate(["/tutoring/booking"]);
      } else {
        GlobalService.courses.forEach(c => {
          this.categoryService.getCourseSummary(c.course_id)
          .subscribe((res) => {
            console.log("course summary resp: ", res);
            this.courses.push(res);
            this.categoryService.storeCourseInCahce(res);
          });
        })
      }
    }

  }
  /*
  getProfile() {
    console.log("User", this.currentUser);
    this.authService
      .getProfileById(this.currentUser.data.user.id)
      .subscribe((res) => {
        this.profile = res;
      });
  }*/

}
