import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";

@Component({
  selector: "app-course-summary",
  templateUrl: "./course-summary.component.html",
  styleUrls: ["./course-summary.component.css"],
})
export class CourseSummaryComponent implements OnInit {
  @Input() selectedCourseInp: Course;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
