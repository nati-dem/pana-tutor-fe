import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './home/course.component';
import { CourseDetailComponent } from './detail/course-detail.component';

const routes: Routes = [
  { path: 'home/:course-id', component: CourseComponent },
  //{ path: 'view/:course-id', component: CourseDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
