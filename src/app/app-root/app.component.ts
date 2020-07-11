import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
} from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { GlobalService } from "../service/global.service";
import { AuthService } from "../service/auth.service";
import { Event } from "../enum/event.enum";
import { BehaviorSubject, Observable, of as observableOf } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = "pana-tutor";
  public isMenuCollapsed = false;
  public isHomePage = false;
  public showJoinUsSection = false;
  parentHasLoaded = false;

  constructor(
    private location: Location,
    private router: Router,
    private globalService: GlobalService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (this.location.path() == "/categories") {
        this.showJoinUsSection = true;
        this.isHomePage = false;
      } else if (this.location.path() != "") {
        this.showJoinUsSection = false;
        this.isHomePage = false;
      } else {
        this.showJoinUsSection = true;
        this.isHomePage = true;
      }
    });
    // validate token in local storage on page refresh, clear if expired/invalid
    this.validateLocalToken();
  }

  validateLocalToken = async () => {
    console.log("@ validateLocalToken if present in local storage --> ", this.authService.getLocalToken());
    this.parentHasLoaded = false;
    if (this.authService.localStorageHasToken()) {
      await this.authService.getUserAuthInfo()
        .subscribe((res) => {
        console.log('setUserGlobals API res', res);
        GlobalService.userId = res.user_id;
        GlobalService.courses = res.courses;
        GlobalService.userRole = res.user_role;
        GlobalService.email = res.email;
        this.parentHasLoaded = true;
        console.log("@ setting token in memory");
        this.authService.token = this.authService.getLocalToken();
        this.authService.notifyAuthObservers(true);
      }, err => {
        console.log('setUserGlobals API err', err);
        this.parentHasLoaded = true;
        this.authService.logout();
      });
        /* this.authService.validateToken().subscribe(
        (res) => {
          console.log("validate token response", res);
          console.log("@ setting token in memory");
          this.authService.token = this.authService.getLocalToken();
          this.authService.notifyAuthObservers(true);
        },
        (err) => {
          console.log("validateLocalToken Error", err);
          this.authService.logout();
        }
        ); */
    } else {
      this.parentHasLoaded = true;
    }
  }

  ngAfterViewInit() {}
}
