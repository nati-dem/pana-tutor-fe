import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CourseRoutingModule } from "./course-routing.module";
import { CourseComponent } from "./home/course.component";
import { CourseDetailComponent } from "./detail/course-detail.component";

@NgModule({
  declarations: [CourseComponent, CourseDetailComponent],
  imports: [CommonModule, CourseRoutingModule],
})
export class CourseModule {}
