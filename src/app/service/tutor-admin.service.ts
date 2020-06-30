import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment as env } from "./../../environments/environment";
import { BaseHttpService } from "./base.http.service";
import { TutorAssignRequest } from "../../../../pana-tutor-lib/model/tutor/tutor-admin.interface";

@Injectable({
  providedIn: 'root',
})
export class TutorAdminService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getTutorsInCourse(courseId){
    const url = `${env.tutorListInCourseUrl}/${courseId}/?userStatus=active`
    console.log('getTutorsInCourse url:', url)
    return this.http.get<any>(env.userApiBaseUrl + url, super.httpOptionsWithAuth());
  }

  assignTutorInCourse(req: TutorAssignRequest) {
    const url = `${env.userApiBaseUrl}${env.tutorAssignInCourseUrl}`;
    return this.http.post<any>(url, req, super.httpOptionsWithAuth());
  }

  removeTutorFromCourse(courseId, userId) {
    // /tutor-admin/course/<courseId>/tutor/<userId>
    let url = env.tutorRemoveInCourseUrl.replace('<courseId>', courseId);
    url = url.replace('<userId>', userId);
    console.log('removeTutorFromCourse url::', url)
    return this.http.delete<any>(`${env.userApiBaseUrl}${url}`, super.httpOptionsWithAuth());
  }

}
