import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CategoryListComponent } from "./root-comp/category-list.component";
import { CourseListComponent } from "./course-list/course-list.component";

const routes: Routes = [
  { path: "", component: CategoryListComponent },
  { path: "courses/:cat-id", component: CourseListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseCategoryRoutingModule {}
