import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import { UserLoginRequest } from './../../model/user/user-auth.interface';
import {GlobalService} from "../../service/global.service";
import { Router } from '@angular/router';
import { Event } from './../../enum/event.enum';
import {BaseFormComponent} from '../../shared/base-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseFormComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService,
    private router: Router,
    private globalService: GlobalService) {
      super();
      console.log('inside LoginComponent cost')
      super.setForm(this.loginForm);
    }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
    let userLoginReq: UserLoginRequest = this.getFormData();
    this.disableForm();
    this.authService.authenticate(userLoginReq)
      .subscribe( res => {
        console.log('HTTP response', res);
        this.authService.saveInLocalStorage(res);
        this.authService.notifyAuthEvt(true)
        this.router.navigate(['/profile']);
      }, err => {
        console.log('HTTP Error', err)
        this.enableForm();
      }, () => {
        this.enableForm();
      });
  }

  getFormData(){
    return {
      username : this.loginForm.value.email.trim(),
      password: this.loginForm.value.password.trim(),
    };
  }

}
