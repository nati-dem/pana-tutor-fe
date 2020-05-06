import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import {GlobalService} from "../service/global.service";
import {AuthService} from "../service/auth.service";
import {Event} from "../enum/event.enum";
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'pana-tutor';
  public isMenuCollapsed = false;
  public isHomePage = false;
  

  constructor(private location: Location, 
    private router: Router, 
    private globalService: GlobalService,
    private authService: AuthService, private cd: ChangeDetectorRef) { 
  }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (this.location.path() != "") {
        this.isHomePage = false;
      } else {
        this.isHomePage = true;
      }
    });
    // validate token in local storage on page refresh, clear if expired/invalid
    this.validateLocalToken();
  }
  
  validateLocalToken(){
    console.log('@ validateLocalToken if present in local storage')
    if(this.authService.localStorageHasToken()) {
      this.authService.validateToken()
      .subscribe( res => {
        console.log('validate token response', res);
        console.log('@ setting token in memory')
        this.authService.token = this.authService.getLocalToken();
        this.authService.notifyAuthEvt(true);
      }, err => {
        console.log('validateLocalToken Error', err)
        this.authService.logout();
      });
    }
  }

  ngAfterViewInit() {
  }

}
