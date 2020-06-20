import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";
import { CategoryService } from "../../service/category.service";
import { CourseService } from "../../service/course.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-course-home',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  selectedCourse: Course;
  closeResult: string;
  sections: any;
  selectedSection: any;
  selectedLesson: any;
  apiError: any;
  page = 'topics';
  courseId;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private courseService: CourseService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.page = params.page;
    });
    this.courseId = +this.route.snapshot.paramMap.get("course-id");
    this.getCourseSummary(this.courseId);
  }

  getCourseSummary(id) {
    console.log("@getCourseSummary course-id: ", id);
    this.categoryService.getCourseSummary(id)
    .subscribe((res) => {
      console.log("@getCourseSummary resp: ", res);
      this.selectedCourse = res;
    });
  }

  getRouterLink(){
    return `/course/home/${this.courseId}`;
  }

}
