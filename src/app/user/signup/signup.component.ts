import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSignupRequest } from './../../model/user/user-auth.interface';
import {AuthService} from '../../service/auth.service';
import { Router } from '@angular/router';
import {BaseFormComponent} from '../../shared/base-form.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends BaseFormComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(4)] ),
    password: new FormControl('', [Validators.required, Validators.minLength(4)] ),
    password2: new FormControl('', [Validators.required, Validators.minLength(4)] ),
    name: new FormControl('', [Validators.required, Validators.minLength(4)] )
  });

  constructor(private authService: AuthService,
    private router: Router) {
      super();
      console.log('inside signupcomp cost')
      super.setForm(this.signupForm);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.signupForm.value);
    let signupReq: UserSignupRequest = this.mapFormData();
    this.disableForm();
    this.authService.signup(signupReq)
      .subscribe( res => {
        console.log('HTTP response', res);
      }, err => {
        console.log('HTTP Error', err)
        this.enableForm();
      }, () => {
        this.enableForm();
      });
  }

  mapFormData(): UserSignupRequest {
    return {
      name : this.signupForm.value.name,
      username : (this.signupForm.value.email.split("@"))[0],
      email : this.signupForm.value.email,
      password: this.signupForm.value.password,
      roles: ['subscriber']
    };
  }

}
