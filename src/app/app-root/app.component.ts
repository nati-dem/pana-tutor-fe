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
  authenticated$: Observable<boolean>;

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
    //this.validateLocalToken();
    this.authService.isAuthenticated$.subscribe(res => {
      this.authenticated$ = observableOf(res);
      this.cd.detectChanges();
      console.log('this.authenticated$ ', res)
    })

  }

  validateLocalToken(){
    if(this.authService.localStorageHasToken()) {
      this.authService.validateToken()
      .subscribe( res => {
        console.log('validate token response', res);
        this.authService.isLoggedIn = true;
        this.authenticated$ = observableOf(true);
      }, err => {
        console.log('HTTP Error', err)
        this.authService.logout();
        this.authenticated$ = observableOf(false);
      });
    }
  }

  ngAfterViewInit() {
    //this.cd.detectChanges();
    console.log(`Parent ngAfterViewInit`)
  }

}
