import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseAdminRoutingModule } from './course-admin-routing.module';
import { CourseAdminComponent } from './course-list/course-admin.component';


@NgModule({
  declarations: [CourseAdminComponent],
  imports: [
    CommonModule,
    CourseAdminRoutingModule
  ]
})
export class CourseAdminModule { }
