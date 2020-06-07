import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-profile-dash',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.css']
})
export class ProfileDashboardComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.isTokenValid())
    //let currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.authService.decodeToken(localStorage.getItem('pana_user_token')))
  }

}
