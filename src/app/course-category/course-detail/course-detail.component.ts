import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.css"],
})
export class CourseDetailComponent implements OnInit {
  @Input() selectedCourseInp: Course;
  selectedCourse: Course;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    // this.selectedCourse = history.state;
  }
  closeResult: string;

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
