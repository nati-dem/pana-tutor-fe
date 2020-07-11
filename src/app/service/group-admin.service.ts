import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment as env } from "./../../environments/environment";
import { BaseHttpService } from "./base.http.service";
import { TutorGroupCreate,GroupMemberRequest } from "../../../../pana-tutor-lib/model/tutor/tutor-group.interface";

@Injectable({
  providedIn: 'root',
})
export class GroupAdminService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getGroupsInCourse(courseId){
    const url = `${env.allGroupsInCourseUrl}/${courseId}/?groupStatus=active`
    console.log('getGroupsInCourse url:', url)
    return this.http.get<any>(env.userApiBaseUrl + url, super.httpOptionsWithAuth());
  }

  createGroup(req: TutorGroupCreate) {
    const url = `${env.userApiBaseUrl}${env.addGroupInCourseUrl}`;
    return this.http.post<any>(url, req, super.httpOptionsWithAuth());
  }

  upsertMemberInGroup(req: GroupMemberRequest) {
    const url = `${env.userApiBaseUrl}${env.addMemberInGroupUrl}`;
    return this.http.put<any>(url, req, super.httpOptionsWithAuth());
  }

}
