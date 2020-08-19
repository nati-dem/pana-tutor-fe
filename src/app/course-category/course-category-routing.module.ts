import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CategoryListComponent } from "./root-comp/category-list.component";
import { CourseListComponent } from "./course-list/course-list.component";
// import { CourseDetailComponent } from "../course/course-detail/course-detail.component";
import { CourseSummaryComponent } from "./course-summary/course-summary.component";
import { CourseSearchComponent } from "./course-search/course-search.component";

const routes: Routes = [
  { path: "", component: CourseSearchComponent },
  //{ path: "", component: CategoryListComponent },
  { path: "courses/:cat-id", component: CourseListComponent },
  //{ path: "course-summary/:course-id", component: CourseSummaryComponent },
  // { path: "detail/:cat-id", component: CourseDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseCategoryRoutingModule {}
