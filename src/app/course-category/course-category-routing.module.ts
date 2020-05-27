import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CategoryListComponent } from "./root-comp/category-list.component";
import { CourseListComponent } from "./course-list/course-list.component";
import { CourseDetailComponent } from "./course-detail/course-detail.component";

const routes: Routes = [
  { path: "", component: CategoryListComponent },
  { path: "courses/:cat-id", component: CourseListComponent },
  { path: "detail/:cat-id", component: CourseDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseCategoryRoutingModule {}
