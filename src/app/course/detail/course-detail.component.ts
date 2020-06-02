import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";
import { CategoryService } from "../../service/category.service";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.css"],
})
export class CourseDetailComponent implements OnInit {
  //@Input() selectedCourseInp: Course;
  selectedCourseInp: Course;
  closeResult: string;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    //console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    // this.selectedCourse = history.state;
    const id = +this.route.snapshot.paramMap.get("course-id");
    this.getCourseSummary(id);
  }

  getCourseSummary(id) {
    console.log("getting course summary by course-id: ", id);
    this.categoryService.getCourseSummary(id)
    .subscribe((res) => {
      console.log("course summary resp: ", res);
      this.selectedCourseInp = res;
      //console.log(this.courses);
    });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
