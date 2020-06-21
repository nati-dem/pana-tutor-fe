import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CountdownModule } from "ngx-countdown";
import { ReactiveFormsModule } from "@angular/forms";
import { CourseRoutingModule } from "./course-routing.module";
import { CourseComponent } from "./home/course.component";
import { CourseDetailComponent } from "./detail/course-detail.component";
import { QuizConductorComponent } from "./quiz-conductor/quiz-conductor.component";
import { TutorGroupModule } from '../tutor-group/tutor-group.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CourseComponent,
    CourseDetailComponent,
    QuizConductorComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    CountdownModule,
    ReactiveFormsModule,
    TutorGroupModule,
    SharedModule
  ],
})
export class CourseModule {}
