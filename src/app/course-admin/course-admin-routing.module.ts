import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseAdminComponent } from './course-list/course-admin.component';

const routes: Routes = [{ path: '', component: CourseAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseAdminRoutingModule { }
