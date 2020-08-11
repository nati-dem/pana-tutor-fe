// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userApiBaseUrl: "http://localhost:5000/dev/api",
  uploadBaseLocation: "http://localhost:8888/panatutor-uploads",
  avatarsLocation: "/avatar/",
  // userApiBaseUrl: "https://panalearn.com/dev/api",
  loginUrl: "/auth/login",
  signupUrl: "/auth/register",
  profileUrl: "/users/profile",
  googleLoginUrl: "/auth/google",
  profileUpdateUrl: "/users/profile",
  passwordUpdateUrl: "/users/change-password",
  userAuthInfoUrl: "/users/auth-info",
  publicUserProfileUrl: "/public/users/profile",
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
  localSubmitedAnsPrefix: "pana_submited_ans_",
  localQuizQuestionPrefix: "pana_quiz_questions_",
  searchCoursesUrl: "/search/?entity=courses",
  searchUsersWpUrl: "/search/?entity=users",
  searchUsersUrl: "/search/users",
  allGroupsInCourseUrl: "/tutor-groups/course",
  addGroupInCourseUrl: "/tutor-groups/create",
  addMemberInGroupUrl: "/tutor-groups/members",
  findGroupsOfUserInCourse: "/tutor-groups/user/course",
  findAllGroupsOfUser: "/tutor-groups/user/all",
  addTutorBoardGroupPost: "/tutor-posts/groups/post",
  getTuturBoardPost: "/tutor-posts/groups/<groupId>/posts",
  removeTutorBoardUrl: "/tutor-posts/groups/<groupId>/posts/<postId>",
  tutorListInCourseUrl: "/tutor-admin/course",
  tutorAssignInCourseUrl: "/tutor-admin/course/tutor/assign",
  tutorRemoveInCourseUrl: "/tutor-admin/course/<courseId>/tutor/<userId>",
  avatarUploadUrl: "/users/avatar",
  validateCourseBookingRequest: "/tutor-booking/validate-course/<courseId>",
  putTutorBookingRequest: "/tutor-booking/booking-request/<courseId>",
  generatePaymentInfo: "/payment/generate-payment-info",
  verifyPayment: "/payment/ypay-pdt/verify-and-finalize-booking"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
