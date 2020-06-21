import { Component, OnInit } from "@angular/core";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";
import { UserService } from "../../service/user.service";

@Component({
  selector: "app-user-search",
  templateUrl: "./user-search.component.html",
  styleUrls: ["./user-search.component.css"],
})
export class UserSearchComponent implements OnInit {

  searchResult = [];
  isSearchLoading = false;
  searchSubmit = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
  }

  onEnter(value: string) { 
    if(value.length >= 4) {
      this.isSearchLoading = true;
      console.log(value)
      this.searchSubmit = false;
      this.userService.findUser(value)
      .subscribe(res => {
        console.log("search res::", res)
        this.searchResult = res;
        this.searchSubmit = true;
        this.isSearchLoading = false;
      }, err => {
        this.searchResult = [];
        this.searchSubmit = true;
        this.isSearchLoading = false;
      });
    }

   }

}
