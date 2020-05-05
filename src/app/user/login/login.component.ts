import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import { UserLoginRequest } from './../../model/user.interface';
import {GlobalService} from "../../service/global.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService,
    private router: Router,
    private globalService: GlobalService) {
    }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
    let userLoginReq: UserLoginRequest = {
      username : this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.disableForm();
    this.authService.login(userLoginReq)
      .subscribe( res => {
        console.log('HTTP response', res);
        this.authService.token = res.token;
        localStorage.setItem('user', JSON.stringify(res)); 
        localStorage.setItem('user_token', res.token);
        this.router.navigate(['/profile']);
      }, err => {
        console.log('HTTP Error', err)
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
  }

  disableForm(){
    this.isLoading = true;
    this.loginForm.disable;
  }

}
