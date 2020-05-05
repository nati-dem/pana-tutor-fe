import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import {GlobalService} from "../service/global.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pana-tutor';
  public isMenuCollapsed = false;
  public isHomePage = false;
  public isLoggedIn = false;

  constructor(private location: Location, 
    private router: Router, 
    private globalService: GlobalService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (this.location.path() != "") {
        this.isHomePage = false;
      } else {
        this.isHomePage = true;
      }
    });
    this.validateLocalToken();
  }

  validateLocalToken(){
    if(this.authService.localStorageHasToken()) {
      this.authService.validateToken()
      .subscribe( res => {
        console.log('validate token response', res);
        this.authService.isLoggedIn = true;
        this.isLoggedIn = true;
      }, err => {
        console.log('HTTP Error', err)
        this.authService.logout();
        this.isLoggedIn = false;
      });
    }
  }
  
}
