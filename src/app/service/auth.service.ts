import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError, Subject, BehaviorSubject, of } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { BaseHttpService } from "./base.http.service";
import { environment as env } from "./../../environments/environment";
import {
  UserLoginRequest,
  UserSignupRequest,
} from "./../../../../pana-tutor-lib/model/user/user-auth.interface";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Config } from "../enum/config.enum";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseHttpService {

  private _token;
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, 
    private jwtHelper: JwtHelperService) {
    super();
  }

  notifyAuthObservers(evt: boolean) {
    this.isAuthenticated$.next(evt);
  }

  authenticate(userLogin: UserLoginRequest): Observable<any> {
    return this.http.post<any>(
      env.userApiBaseUrl + env.loginUrl,
      userLogin,
      super.httpOptions()
    );
    /*return of({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      userId: 123
    });*/
  }

  getProfileById(id: number) {
    const url = `${env.userApiBaseUrl + env.profileUrl}/${id}`;
    return this.http.get<UserSignupRequest>(url, super.httpOptionsWithAuth());
  }

  getUserAuthInfo() {
    const url = `${env.userApiBaseUrl + env.userAuthInfoUrl}`;
    return this.http.get<any>(url, super.httpOptionsWithAuth());
  }

  setUserAuthGlobals() {
    console.log('setUserAuthGlobals api call..');
    const url = `${env.userApiBaseUrl + env.userAuthInfoUrl}`;
    return this.http.get<any>(url, super.httpOptionsWithAuth())
      .subscribe((res) => {
        console.log('setUserAuthGlobals res', res);
        GlobalService.userId = res.user_id;
        GlobalService.courses = res.courses;
        GlobalService.userRole = res.user_role;
        GlobalService.email = res.email;
        GlobalService.userName = res.name;
      }, err => {
        console.log('setUserAuthGlobals err', err);
      });
  }

  signup(signupReq: UserSignupRequest): Observable<any> {
    return this.http.post<any>(
      env.userApiBaseUrl + env.signupUrl,
      signupReq,
      super.httpOptionsWithAuth()
    );
  }

  saveTokenInLocal(res) {
    this.token = res.token;
    //localStorage.setItem("user", JSON.stringify(res));
    localStorage.setItem(Config.USER_TOKEN, res.token);
  }

  validateToken() {
    return this.http.post<any>(
      env.userApiBaseUrl + env.tokenValidationUrl,
      {},
      super.httpOptionsWithAuth()
    );
  }

  localStorageHasToken() {
    return localStorage.getItem(Config.USER_TOKEN) != null;
  }

  getLocalToken() {
    return localStorage.getItem(Config.USER_TOKEN);
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem(Config.USER_TOKEN);
    this.token = null;
    this.notifyAuthObservers(false);
    GlobalService.resetAll();
  }

  isTokenValid() {
    // token should be saved in memory since it's set whenever page is refreshd
    //console.log("inMemoryToken::", this.token);
    const isTokenValid =
      localStorage.getItem(Config.USER_TOKEN) &&
      !this.jwtHelper.isTokenExpired();
    console.log("token valid..", isTokenValid);
    return isTokenValid;
  }

  decodeToken(token) {
    return this.jwtHelper.decodeToken(token);
  }

  get token() {
    return this._token;
  }
  set token(t) {
    this._token = t;
  }

}

