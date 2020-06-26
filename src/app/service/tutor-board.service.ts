import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment as env } from "./../../environments/environment";
import { BaseHttpService } from "./base.http.service";
import { TutorGroupCreate,GroupMemberRequest } from "../../../../pana-tutor-lib/model/tutor/tutor-group.interface";

@Injectable({
  providedIn: 'root',
})
export class TutorBoardService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getGroupsOfUserInCourse(courseId, groupStatus='active'){
    const url = `${env.findGroupsOfUserInCourse}/?courseId=${courseId}&groupStatus=${groupStatus}`
    console.log('getGroupsOfUserInCourse url:', url)
    return this.http.get<any>(env.userApiBaseUrl + url, super.httpOptionsWithAuth());
  }

}
