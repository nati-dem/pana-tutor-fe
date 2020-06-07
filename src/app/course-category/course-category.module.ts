import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms"; // <-- NgModel lives here

import { CourseCategoryRoutingModule } from "./course-category-routing.module";
import { CategoryListComponent } from "./root-comp/category-list.component";

import { CourseSummaryComponent } from "./course-summary/course-summary.component";
import { CourseListComponent } from "./course-list/course-list.component";
import { JoinComponent } from "./join/join.component";
import { CourseSearchComponent } from "./course-search/course-search.component";

@NgModule({
  declarations: [
    CourseListComponent,
    CourseSearchComponent,
    CategoryListComponent,
    JoinComponent,
    CourseSummaryComponent,
  ],
  imports: [CommonModule, CourseCategoryRoutingModule, FormsModule],
})
export class CourseCategoryModule {}
