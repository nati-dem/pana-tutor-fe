import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, Subject, BehaviorSubject, of } from "rxjs";
import { CourseCategory } from "../../../../pana-tutor-lib/model/course/category.interface";
import { Course } from "../../../../pana-tutor-lib/model/course/course.interface";
import { Complexity } from "../../../../pana-tutor-lib/enum/common.enum";
import { environment as env } from "./../../environments/environment";
import { filter, find, tap } from "lodash";
import { catchError } from "rxjs/operators";
//import {CategoryModule} from '../category.module'

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  findCategories(): Observable<any> {
    return this.http.get<any>(env.userApiBaseUrl + env.categoryUrl);
  }

  findCoursesByCategory(id: number) {
    /*return filter(sampleCourses, (o) => {
      if (o.category == id) return o;
    });*/
    return this.http.get<Course[]>(
      `${env.userApiBaseUrl}${env.courseByCategoryIdUrl}/${id}`
    );
  }

  // findCoursByCategoryid(id: number): Observable<Course[]> {
  //   return this.http.get<Course[]>(
  //     env.userApiBaseUrl + env.courseByCategoryIdUrl + id
  //   );
  // }

  getService(id: number): Observable<any> {
    const url = `${env.userApiBaseUrl + env.courseByCategoryIdUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getImages(id: number): Observable<any> {
    const url = `${env.userApiBaseUrl + env.featureMediaUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
export const sampleCategories: CourseCategory[] = [
  {
    id: 1,
    status: "published",
    type: "course_category",
    title: { rendered: "Physics Grade 7" },
    content: { rendered: "Sample content for Physics Grade 7" },
    author: 1,
  },
  {
    id: 2,
    status: "published",
    type: "course_category",
    title: { rendered: "Physics Grade 7" },
    content: { rendered: "Sample content for Physics Grade 7" },
    author: 1,
  },
  {
    id: 3,
    status: "published",
    type: "course_category",
    title: { rendered: "Physics Grade 7" },
    content: { rendered: "Sample content for Physics Grade 7" },
    author: 1,
  },
  {
    id: 4,
    status: "published",
    type: "course_category",
    title: { rendered: "Physics Grade 7" },
    content: { rendered: "Sample content for Physics Grade 7" },
    author: 1,
  },
  {
    id: 5,
    status: "published",
    type: "course_category",
    title: { rendered: "Physics Grade 7" },
    content: { rendered: "Sample content for Physics Grade 7" },
    author: 1,
  },
  {
    id: 6,
    status: "published",
    type: "course_category",
    title: { rendered: "Web Devt" },
    content: { rendered: "Sample content for Web Devt" },
    author: 1,
  },
];
const sampleCourseFields = {
  course_categories: [1],
  course_sections: [],
  price: "free",
  course_instructor: "1",
  course_prerequisites: [],
  course_complexity: Complexity.easy,
  bonus_reward_point: 5,
};

export const sampleCourses: Course[] = [
  {
    id: 11,
    acf: sampleCourseFields,
    status: "published",
    type: "course",
    title: { rendered: "Algebra" },
    content: { rendered: "Algebra Content" },
    author: 1,
  },
  {
    id: 12,
    acf: sampleCourseFields,
    status: "published",
    type: "course",
    title: { rendered: "Math" },
    content: { rendered: "Algebra Content" },
    author: 1,
  },
  {
    id: 13,
    acf: sampleCourseFields,
    status: "published",
    type: "course",
    title: { rendered: "Physics" },
    content: { rendered: "Algebra Content" },
    author: 1,
  },
  {
    id: 14,
    acf: sampleCourseFields,
    status: "published",
    type: "course",
    title: { rendered: "Html & CSS basics" },
    content: { rendered: "Algebra Content" },
    author: 1,
  },
];
