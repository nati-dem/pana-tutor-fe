import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Observable, of as observableOf } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  authenticated$: boolean;
  public isMenuCollapsed = false;

  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((res) => {
      this.authenticated$ = res;
      this.cd.detectChanges();
      console.log("this.authenticated$ ", res);
    });
  }

  ngAfterViewInit() {
    //this.cd.detectChanges();
    console.log(`navbar ngAfterViewInit`);
  }
}
