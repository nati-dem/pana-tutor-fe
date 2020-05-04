import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',redirectTo: '',pathMatch: 'full'},
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'categories', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
  { path: 'course-admin', loadChildren: () => import('./course-admin/course-admin.module').then(m => m.CourseAdminModule) },
  { path: 'course', loadChildren: () => import('./course/course.module').then(m => m.CourseModule) },
  { path: 'tutor-request', loadChildren: () => import('./tutor-booking/tutor-booking.module').then(m => m.TutorBookingModule) },
  { path: 'tutor-session', loadChildren: () => import('./tutor-session/tutor-session.module').then(m => m.TutorSessionModule) }
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
