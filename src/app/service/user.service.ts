import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, Subject, BehaviorSubject, of } from "rxjs";
import { environment as env } from "./../../environments/environment";
import { filter, find, tap } from "lodash";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  findUser(q): Observable<any> {
    const url = `${env.searchUsersUrl}&q=${q}`;
    return this.http.get<any>(env.userApiBaseUrl + url);
  }
}
