import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";
import { CategoryService } from "../../service/category.service";
import { CourseService } from "../../service/course.service";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.css"],
})
export class CourseDetailComponent implements OnInit {
  @Input() selectedCourse: Course;
  closeResult: string;
  sections: any;
  selectedSection: any;
  selectedLesson: any;
  apiError: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private courseService: CourseService) {
    //console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("course-id");
    this.getCourseDetails(id);
  }

  getCourseDetails(id){
    console.log("@getCourseDetails course-id: ", id);
    if(this.selectedCourse) {
      this.getSections(id, this.selectedCourse.acf.course_sections);
    }
  }
  /*
  getCourseSummary(id) {
    console.log("get course detail by course-id: ", id);
    this.categoryService.getCourseSummary(id).subscribe((res) => {
      console.log("course detail resp: ", res);
      this.selectedCourse = res;
      this.getSections(id, this.selectedCourse.acf.course_sections);
      //console.log(this.courses);
    });
  }*/

  getSections(id, sectionIds) {
    this.courseService.getSections(id, sectionIds).subscribe(
      (res) => {
        console.log("getSections resp:: ", res);
        this.sections = res;
        this.selectedSection = res[0];
      },
      (err) => {
        console.log(err);
        this.apiError = err;
      }
    );
  }

  selectSection(evt, f) {
    console.log("selectSection::: ", f);
    this.selectedSection = f;
  }

  openVerticallyCentered(content, lesson?) {
    this.selectedLesson = lesson;
    console.log("lesson:: ", lesson);
    this.modalService.open(content, {
      centered: true,
      size: "xl",
      backdrop: "static",
      keyboard: false,
    }); //scrollable:true
  }
}
