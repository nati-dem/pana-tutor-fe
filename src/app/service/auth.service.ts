import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {BaseHttpService} from './base.http.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { UserLoginRequest } from './../model/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Event } from './../enum/event.enum';

@Injectable({
    providedIn: 'root',
  })
export class AuthService extends BaseHttpService {

  private _token;
  private _isLoggedIn = false;
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private  jwtHelper: JwtHelperService) {
      super();
  }

  notifyAuthEvt(evt: boolean) {
    this.isAuthenticated$.next(evt);
  }

  authenticate (userLogin: UserLoginRequest): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': '*/*'
      })
    };
    //return this.http.post<any>(environment.loginUrl, userLogin, httpOptions)
    return of({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      userId: 123
    });
  }

  saveInLocalStorage(res){
    this.token = res.token;
    localStorage.setItem('user', JSON.stringify(res)); 
    localStorage.setItem('user_token', res.token);
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

  get isLoggedIn(){
    return this._isLoggedIn;
  }
  set isLoggedIn(loggedIn){
    this._isLoggedIn =  loggedIn;
  }

}
