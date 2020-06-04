import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-quiz-conductor',
  templateUrl: './quiz-conductor.component.html',
  styleUrls: ['./quiz-conductor.component.css']
})
export class QuizConductorComponent implements OnInit {

  //@Input() quizInp: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openVerticallyCentered(content, lesson?) {
    //this.selectedLesson = lesson;
    this.modalService.open(content, { centered: true, size:'lg'  }); //scrollable:true
  }

}
