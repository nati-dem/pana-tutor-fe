import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, Subject, BehaviorSubject, of } from "rxjs";
import { environment as env } from "./../../environments/environment";
import { filter, find, tap } from "lodash";
import { catchError } from "rxjs/operators";
import { BaseHttpService } from "./base.http.service";
import { UserSignupRequest, ChangePasswordRequest } from '../../../../pana-tutor-lib/model/user/user-auth.interface';

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseHttpService {
  constructor(private http: HttpClient) {
    super();
  }

  findUser(q): Observable<any> {
    const url = `${env.searchUsersUrl}/?q=${q}`;
    return this.http.get<any>(env.userApiBaseUrl + url);
  }

  getUserInfoById(id): Observable<any> {
    const url = `${env.publicUserProfileUrl}/${id}`;
    return this.http.get<any>(env.userApiBaseUrl + url, super.httpOptionsWithAuth());
  }

  updateProfile(reqObj: UserSignupRequest): Observable<any> {
    return this.http.post<any>(
      env.userApiBaseUrl + env.profileUpdateUrl,
      reqObj,
      super.httpOptionsWithAuth()
    );
  }

  changePassword(reqObj: ChangePasswordRequest): Observable<any> {
    return this.http.post<any>(
      env.userApiBaseUrl + env.passwordUpdateUrl,
      reqObj,
      super.httpOptionsWithAuth()
    );
  }

}
