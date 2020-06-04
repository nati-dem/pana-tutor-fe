import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment as env } from "./../../environments/environment";
import { BaseHttpService } from "./base.http.service";
import { HttpHeaders } from '@angular/common/http';
import { Config} from '../enum/config.enum';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getSections(courseId, sectionIds){
    let url = env.courseSectionUrl.replace("<courseId>", courseId)
    sectionIds.sort();
    url = `${url}/${sectionIds}`
    console.log('service getSections:', sectionIds, ' && url:', url)
    return this.http.get<any>(env.userApiBaseUrl + url, super.httpOptionsWithAuth());
  }

}
