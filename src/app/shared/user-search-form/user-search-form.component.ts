import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from "../../service/user.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrls: ['./user-search-form.component.css']
})
export class UserSearchFormComponent implements OnInit {

  @Output() userSelectedEmitter = new EventEmitter<any>();
  isUserSearchLoading = false;
  searchUserResult = [];
  searchUserSubmit = false;
  userListActiveIndex;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  searchUserFormSubmit(value: string) {
    if(value.length >= 4) {
      this.userListActiveIndex = -1;
      this.isUserSearchLoading = true;
      this.resetSelectedUser();
      this.searchUserSubmit = false;
      this.userService.findUser(value)
        .subscribe(res => {
          console.log("search res::", res)
          this.searchUserResult = res;
          this.searchUserSubmit = true;
          this.isUserSearchLoading = false;
        }, err => {
          this.searchUserResult = [];
          this.searchUserSubmit = true;
          this.isUserSearchLoading = false;
        });
    }
  }

  selectUser(u, index){
    this.userListActiveIndex = index;
    this.userSelectedEmitter.emit(u);
  }

  resetSelectedUser(){
    this.userSelectedEmitter.emit(null);
  }

}
