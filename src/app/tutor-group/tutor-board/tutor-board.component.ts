import { Component, OnInit } from '@angular/core';
import { TutorBoardService } from "../../service/tutor-board.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-tutor-board',
  templateUrl: './tutor-board.component.html',
  styleUrls: ['./tutor-board.component.css']
})
export class TutorBoardComponent implements OnInit {

  courseId;

  constructor(private tutorBoardService: TutorBoardService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get("course-id");
    this.tutorBoardService.getGroupsOfUserInCourse(this.courseId)
    .subscribe(res => {
      console.log('getGroupsOfUserInCourse res:', res)
    })
  }

}
