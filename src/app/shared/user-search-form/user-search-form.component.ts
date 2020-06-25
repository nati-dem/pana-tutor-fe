import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from "../../service/user.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap, switchMap, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrls: ['./user-search-form.component.css']
})
export class UserSearchFormComponent implements OnInit {

  @Output() userSelectedEmitter = new EventEmitter<any>();
  //isUserSearchLoading = false;
  //searchUserResult = [];
  //searchUserSubmit = false;
  //userListActiveIndex;

  selectedUser = null;
  searching = false;
  searchFailed = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  search = (text$: Observable<string>) => 
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    tap(() => this.searching = true),
    switchMap(term =>
      term.length < 4 ? 
        of([]) : 
        this.userService.findUser(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            this.userSelectedEmitter.emit(null);
            return of([]);
          }))
    ),
    tap(() => this.searching = false)
  )

  resultFormatListValue(value: any) {            
    return value.name;
  } 
  
  inputFormatListValue =(value: any) =>   {
    if(value.name){
      this.selectedUser = value;
      console.log('this.selectedU', this.selectedUser)
      this.userSelectedEmitter.emit(value);
      return value.name
    }
    return value;
  }

  /*
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
  } */
  /*
  selectUser(u, index){
    this.userListActiveIndex = index;
    this.userSelectedEmitter.emit(u);
  }

  resetSelectedUser(){
    this.userSelectedEmitter.emit(null);
  }*/

}
