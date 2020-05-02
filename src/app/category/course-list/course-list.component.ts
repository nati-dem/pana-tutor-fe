import { Component, OnInit } from '@angular/core';
import {Course} from '../model/course.interface'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {CategoryService} from '../service/category.service'

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses = [];
  selectedCourse: Course;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('cat-id');
    this.getCoursesByCategory(id);
  }

  getCoursesByCategory(id){
    this.courses = this.categoryService.findCoursesByCategory(id);
    console.log(this.courses)
  }

  onSelect(course: Course): void {
    this.selectedCourse = course;
  }

  goBack(): void {
    this.location.back();
  }

}
