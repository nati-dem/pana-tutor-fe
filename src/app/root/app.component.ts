import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pana-tutor';
  public isMenuCollapsed = false;
  public isHomePage = false;

  constructor(private location: Location, private router: Router) {
  }

  ngOnInit() { 

    this.router.events.subscribe(val => {
      if (this.location.path() != "") {
        this.isHomePage = false;
      } else {
        this.isHomePage = true;
      }
    });
  }
  
}
