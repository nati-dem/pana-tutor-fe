import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";
import { CategoryService } from "../../service/category.service";

@Component({
  selector: "app-course-summary",
  templateUrl: "./course-summary.component.html",
  styleUrls: ["./course-summary.component.css"],
})
export class CourseSummaryComponent implements OnInit {
  //@Input() selectedCourseInp: Course;
  course:Course;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("course-id");
    this.getCourseSummary(id);
  }

  getCourseSummary(id) {
    console.log("getting course summary by course-id: ", id);
    this.categoryService.getCourseSummary(id)
    .subscribe((res) => {
      console.log("course summary resp: ", res);
      this.course = res;
      //console.log(this.courses);
    });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
