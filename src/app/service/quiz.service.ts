import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment as env } from "./../../environments/environment";
import { BaseHttpService } from "./base.http.service";
import { HttpHeaders } from "@angular/common/http";
import { Config } from "../enum/config.enum";

@Injectable({
  providedIn: "root",
})
export class QuizService extends BaseHttpService {
  constructor(private http: HttpClient) {
    super();
  }

  getQuizByCourseAndSection(courseId, sectionId, quizId) {
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
    let quiz = this.http.get<any>(
      env.userApiBaseUrl + url,
      super.httpOptionsWithAuth()
    );
    quiz.forEach((q) => {
      sessionStorage.setItem(env.localQuizPrefix + quizId, JSON.stringify(q));
    });
    this.getQuizFromCache(quizId);
    return quiz;
  }

  getQuestionByCourseAndQuiz(courseId, quizId, queIds) {
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
    // localStorage.setItem(env.localQuizPrefix + queIds, "melkam loged in");
    // localStorage.getItem("log");

    let quizQuestion = this.http.get<any>(
      env.userApiBaseUrl + url,
      super.httpOptionsWithAuth()
    );
    // this.storeQuizInCahce(quizQuestion);
    quizQuestion.forEach((quiz) => {
      sessionStorage.setItem(
        env.localQuizQuestionPrefix + quizId,
        JSON.stringify(quiz)
      );
    });
    this.getQuizQuestionFromCache(quizId);
    return quizQuestion;
  }

  storeQuizInCache(quizes) {
    quizes.forEach((quiz) => {
      sessionStorage.setItem(
        env.localQuizPrefix + quiz.id,
        JSON.stringify(quiz)
      );
    });
  }

  getQuizFromCache(id) {
    return JSON.parse(sessionStorage.getItem(env.localQuizPrefix + id));
  }
  getQuizQuestionFromCache(id) {
    return JSON.parse(sessionStorage.getItem(env.localQuizQuestionPrefix + id));
  }
}
