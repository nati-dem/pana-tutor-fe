import { Component, OnInit } from "@angular/core";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";
import { ActivatedRoute, Router } from "@angular/router";
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
  categories = [];
  selectedCourse: any;
  //notSelected: boolean = true;
  selectedCategory: any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private categoryService: CategoryService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("cat-id");
    this.getCoursesByCategory(id);
    this.getCategory();
  }

  getCoursesByCategory(id) {
    console.log("getting courses by cat-id: ", id);
    this.categoryService.getService(id).subscribe((res) => {
      this.courses = res;
      this.categoryService.storeCoursesInCahce(res);
      console.log(this.courses);
    });
  }

  getCategory() {
    this.categoryService.findCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  onSelect(course: Course): void {
    // id = course.id;
    this.selectedCourse = course;
    //this.notSelected = false;
    // this.router.navigateByUrl("/detail/`${id}`", {
    //   state: this.selectedCourse,
    // });
  }

  goBack(): void {
    this.location.back();
  }
}
