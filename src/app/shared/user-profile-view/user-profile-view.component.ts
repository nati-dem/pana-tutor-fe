import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
})
export class UserProfileViewComponent implements OnInit, OnChanges {

  @Input() userIdInp;
  userResponse;
  userFindError;
  isUserSearchLoading;
  searchUserSubmit;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    //this.showUserDetail();
  }

  showUserDetail() {
    if(this.userIdInp) {
      this.isUserSearchLoading = true;
      this.searchUserSubmit = true;
      this.userService.getUserInfoById(this.userIdInp)
        .subscribe(res => {
          console.log("getUserInfoById res::", res)
          this.userResponse = res;
          this.isUserSearchLoading = false;
          this.searchUserSubmit = false;
        }, err => {
          console.log("getUserInfoById err::", err)
          this.userFindError = err;
          this.userResponse = null;
          this.isUserSearchLoading = false;
        });
    }
  }

  ngOnChanges() {
    this.showUserDetail();
  }

}

