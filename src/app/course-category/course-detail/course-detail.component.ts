import { Component, OnInit, Input } from '@angular/core';
import {Course} from '../../../../../pana-tutor-lib/model/course.interface'

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  @Input() selectedCourseInp: Course;

  constructor() { }

  ngOnInit(): void {
  }

}

