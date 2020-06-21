// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userApiBaseUrl: "http://localhost:5000/dev/api",
  // userApiBaseUrl: "https://panalearn.com/dev/api",
  loginUrl: "/auth/login",
  signupUrl: "/auth/register",
  profileUrl: "/users/profile",
  tokenValidationUrl: "/auth/token-validate",
  categoryUrl: "/categories",
  courseByCategoryIdUrl: "/categories/courses",
  courseSummary: "/courses",
  featureMediaUrl: "/media",
  courseSectionUrl: "/courses/<courseId>/chapter",
  courseQuizUrl: "/courses/<courseId>/quiz",
  courseQueUrl: "/courses/que",
  getQuizint: "quiz/user",
  startQuizUrl: "quiz/start",
  submitQuizUrl: "quiz/submit-quiz",
  submitQuizAnsUrl: "quiz/submit-answer",
  localCoursePrefix: "pana_course_",
  localQuizPrefix: "pana_quiz_",
  localQuizIntPrefix: "pana_quiz_init_",
  localQuizQuestionPrefix: "pana_quiz_questions_",
  searchCoursesUrl: "/search?entity=courses",
  searchUsersUrl: "/search?entity=users",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
