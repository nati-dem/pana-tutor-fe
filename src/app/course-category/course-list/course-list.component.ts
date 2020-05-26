import { Component, OnInit } from "@angular/core";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { CategoryService } from "../../service/category.service";
import { CourseCategory } from "../../../../../pana-tutor-lib/model/course/category.interface";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"],
})
export class CourseListComponent implements OnInit {
  courses = [];
  selectedCourse: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("cat-id");
    this.getCoursesByCategory(id);
  }

  getCoursesByCategory(id) {
    this.categoryService.getService(id).subscribe((data) => {
      this.courses = data;
    });
    console.log(this.courses);
  }

  onSelect(course: Course): void {
    this.selectedCourse = course;
  }

  goBack(): void {
    this.location.back();
  }
}
