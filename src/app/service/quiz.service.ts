import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment as env } from "./../../environments/environment";
import { BaseHttpService } from "./base.http.service";
import { HttpHeaders } from '@angular/common/http';
import { Config} from '../enum/config.enum';

@Injectable({
  providedIn: 'root',
})
export class QuizService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getQuizByCourseAndSection(courseId, sectionId, quizId){
    let url = env.courseQuizUrl.replace("<courseId>", courseId)
    quizId.sort();
    url = `${url}/${quizId}`
    console.log('@service getQuizByCourse:', quizId, ' && sectionId:', sectionId , ' && url:', url)
    return this.http.get<any>(env.userApiBaseUrl + url, super.httpOptionsWithAuth());
  }

  getQuestionByCourseAndQuiz(courseId, quizId, queId){
    // /dev/api/courses/que/xx?courseId=xx&quizId=xx
    let url = `${env.courseQueUrl}/${queId}?courseId=${courseId}&quizId=${quizId}`
    console.log('@service getQueByCourse:', quizId, ' && queId:', queId , ' && url:', url)
    return this.http.get<any>(env.userApiBaseUrl + url, super.httpOptionsWithAuth());
  }

}
