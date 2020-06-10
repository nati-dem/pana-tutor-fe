import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("userId");
    console.log('@public profile userID:'+ id)
  }

}
