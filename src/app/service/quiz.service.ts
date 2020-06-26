import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment as env } from "./../../environments/environment";
import { BaseHttpService } from "./base.http.service";
import { QuizInit } from "../../../../pana-tutor-lib/model/course/quiz-init.interface";
import { QuizAnsEntry } from "../../../../pana-tutor-lib/model/course/quiz-ans-entry.interface";
import { QuizSubmission } from "../../../../pana-tutor-lib/model/course/quiz-submission.interface";
import { HttpHeaders } from "@angular/common/http";
import { Config } from "../enum/config.enum";

import { from, of, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class QuizService extends BaseHttpService {
  constructor(private http: HttpClient) {
    super();
  }

  getQuizByCourseAndSection(courseId, sectionId, quizId) {
    let quiz = this.getQuizFromCache(quizId);
    if (quiz) {
      return of(quiz);
    }
    let url = env.courseQuizUrl.replace("<courseId>", courseId);
    quizId.sort();
    url = `${url}/${quizId}`;
    console.log(
      "@service getQuizByCourse:",
      quizId,
      " && sectionId:",
      sectionId,
      " && url:",
      url
    );
    return this.http.get<any>(
      env.userApiBaseUrl + url,
      super.httpOptionsWithAuth()
    );
  }

  storeQuizInCache(quiz, quizId) {
    sessionStorage.setItem(env.localQuizPrefix + quizId, JSON.stringify(quiz));
  }

  getQuestionByCourseAndQuiz(courseId, quizId, queIds) {
    const questions = this.getQuizQuestionFromCache(quizId);
    if (questions) {
      console.log("questions from cache");
      return of(questions);
    }
    // /dev/api/courses/que/xx?courseId=xx&quizId=xx
    let url = `${env.courseQueUrl}/${queIds}?courseId=${courseId}&quizId=${quizId}`;
    console.log(
      "@service getQueByCourse:",
      quizId,
      " && queIds:",
      queIds,
      " && url:",
      url
    );

    return this.http.get<any>(
      env.userApiBaseUrl + url,
      super.httpOptionsWithAuth()
    );
  }

  storeQuizQuestionsInCache(quizWithQUestions, quizId) {
    sessionStorage.setItem(
      env.localQuizQuestionPrefix + quizId,
      JSON.stringify(quizWithQUestions)
    );
  }

  getQuizFromCache(id) {
    return JSON.parse(sessionStorage.getItem(env.localQuizPrefix + id));
  }
  getQuizQuestionFromCache(id) {
    return JSON.parse(sessionStorage.getItem(env.localQuizQuestionPrefix + id));
  }
  getQuizInt(id) {
    let url = `${env.userApiBaseUrl}/${env.getQuizint}/${id}`;
    return this.http.get<any>(url, super.httpOptionsWithAuth());
  }

  startQuiz(quizIntreq: QuizInit): Observable<any> {
    let url = `${env.userApiBaseUrl}/${env.startQuizUrl}`;
    return this.http.post<any>(url, quizIntreq, super.httpOptionsWithAuth());
  }

  submitQuizAns(quizsubAnsreq: QuizAnsEntry) {
    let url = `${env.userApiBaseUrl}/${env.submitQuizAnsUrl}`;
    return this.http.post<any>(url, quizsubAnsreq, super.httpOptionsWithAuth());
  }

  submitQuiz(quizreq: QuizSubmission) {
    let url = `${env.userApiBaseUrl}/${env.submitQuizUrl}`;
    return this.http.post<any>(url, quizreq, super.httpOptionsWithAuth());
  }

  storeSubmitedQuestionInCache(sumitedAnse, queid) {
    sessionStorage.setItem(
      env.localSubmitedAnsPrefix + queid,
      JSON.stringify(sumitedAnse)
    );
  }
  getSubmitedAnsInCach(id) {
    return JSON.parse(sessionStorage.getItem(env.localSubmitedAnsPrefix + id));
  }
}
