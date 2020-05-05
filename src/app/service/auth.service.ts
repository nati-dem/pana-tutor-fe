import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {BaseHttpService} from './base.http.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { UserLoginRequest } from './../model/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
  })
export class AuthService extends BaseHttpService {

  private _token;
  private _isLoggedIn = false;

  constructor(private http: HttpClient, private  jwtHelper: JwtHelperService) {
      super();
  }

  login (userLogin: UserLoginRequest): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': '*/*'
      })
    };
    return this.http.post<any>(environment.loginUrl, userLogin, httpOptions)
      //.pipe(
        //catchError(this.handleError)
      //);
  }

  validateToken(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('user_token'),
        'Accept': '*/*'
      })
    };
    return this.http.post<any>(environment.tokenValidationUrl, {}, httpOptions)
  }

  localStorageHasToken(){
    return localStorage.getItem('user_token') != null;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('user_token');
    this._isLoggedIn = false;
    this.token = null;
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
    console.log('token set in auth..')
    this._token = t;
  }

  get isLoggedIn(){
    return this._isLoggedIn;
  }
  set isLoggedIn(loggedIn){
    this._isLoggedIn =  loggedIn;
  }

}
