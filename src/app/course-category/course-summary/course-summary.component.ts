import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";

@Component({
  selector: "app-course-summary",
  templateUrl: "./course-summary.component.html",
  styleUrls: ["./course-summary.component.css"],
})
export class CourseSummaryComponent implements OnInit {
  @Input() selectedCourseInp: Course;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

}
