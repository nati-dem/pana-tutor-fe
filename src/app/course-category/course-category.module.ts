import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { CourseCategoryRoutingModule } from './course-category-routing.module';
import { CategoryListComponent } from './root-comp/category-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseListComponent } from './course-list/course-list.component';
import { JoinComponent } from './join/join.component';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    CategoryListComponent,
    JoinComponent
  ],
  imports: [
    CommonModule,
    CourseCategoryRoutingModule,
    FormsModule
  ]
})
export class CourseCategoryModule { }
