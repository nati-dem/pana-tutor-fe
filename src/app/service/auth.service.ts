import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {BaseHttpService} from './base.http.service';

import { environment as env } from './../../environments/environment';
import { UserLoginRequest,UserSignupRequest } from './../model/user/user-auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { config } from '../enum/config.enum';

@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseHttpService {

  private _token;
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private  jwtHelper: JwtHelperService) {
      super();
  }

  notifyAuthEvt(evt: boolean) {
    this.isAuthenticated$.next(evt);
  }

  authenticate (userLogin: UserLoginRequest): Observable<any> {

    return this.http.post<any>(env.userApiBaseUrl+env.loginUrl, userLogin, super.httpOptions)
    /*return of({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      userId: 123
    });*/
  }

  signup (signupReq: UserSignupRequest): Observable<any> {
    return this.http.post<any>(env.userApiBaseUrl+env.signupUrl, signupReq, super.httpOptionsWithAuth)
  }

  saveInLocalStorage(res){
    this.token = res.token;
    localStorage.setItem('user', JSON.stringify(res)); 
    localStorage.setItem(config.USER_TOKEN, res.token);
  }

  validateToken(){
    return this.http.post<any>(env.userApiBaseUrl+env.tokenValidationUrl, {}, super.httpOptionsWithAuth)
  }

  localStorageHasToken(){
    return localStorage.getItem(config.USER_TOKEN) != null;
  }

  getLocalToken(){
    return localStorage.getItem(config.USER_TOKEN);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem(config.USER_TOKEN);
    this.token = null;
    this.notifyAuthEvt(false);
  }

  isTokenValid(){
    const isTokenValid = !this.jwtHelper.isTokenExpired();
    console.log('token valid..', isTokenValid);
    return isTokenValid;
  }

  decodeToken(token){
    return this.jwtHelper.decodeToken(token);
  }

  get token(){
    return this._token;
  }
  set token(t){
    this._token = t;
  }

}
