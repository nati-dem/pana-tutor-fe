import { Component, OnInit } from "@angular/core";
import { CourseCategory } from "../../../../../pana-tutor-lib/model/course/category.interface";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";
import { MediaModel } from "../../../../../pana-tutor-lib/model/media-model.interface";
import { CategoryService } from "../../service/category.service";
import { from } from "rxjs";

@Component({
  selector: "app-course-search",
  templateUrl: "./course-search.component.html",
  styleUrls: ["./course-search.component.css"],
})
export class CourseSearchComponent implements OnInit {
  categories = [];
  course: Course;
  media: MediaModel;
  category: CourseCategory;
  selectedCat: CourseCategory;
  imageToShow: any;
  isImageLoading: boolean;
  id: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
    // console.log(this.findCategory());
  }

  getCategories() {
    this.categoryService
      .findCategories()
      .subscribe((data) => (this.categories = data));
  }
  getImage() {
    const id = this.category.featured_media;
    this.categoryService
      .getImages(this.id)
      .subscribe((media) => media.find((media) => media.id == id));
  }
  findCategory(id) {
    this.categoryService
      .findCoursesByCategory(id)
      .subscribe((category) => category.find((category) => category.id == id));
  }
  onSelect(cat: CourseCategory): void {
    this.selectedCat = cat;
  }
}
