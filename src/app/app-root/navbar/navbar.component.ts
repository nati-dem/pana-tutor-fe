import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef, Input
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
  @Input() parentHasLoaded = false;

  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((res) => {
      this.authenticated$ = res;
      //this.cd.detectChanges();
      console.log("@navbar this.authenticated$ ", res);
    });
  }

  ngAfterViewInit() {
    //this.cd.detectChanges();
    //console.log(`navbar ngAfterViewInit`);
  }
}
