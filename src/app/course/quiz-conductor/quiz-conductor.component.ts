import { Component, OnInit, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { QuizService } from "../../service/quiz.service";
import { Quiz } from "../../../../../pana-tutor-lib/model/course/quiz.interface";
import { Question } from "../../../../../pana-tutor-lib/model/course/question.interface";

@Component({
  selector: "app-quiz-conductor",
  templateUrl: "./quiz-conductor.component.html",
  styleUrls: ["./quiz-conductor.component.css"],
})
export class QuizConductorComponent implements OnInit {
  @Input() quizInp: any;
  quiz: Quiz;
  quizQuestionIds;
  questions: Question[];

  index = 0;

  constructor(
    private modalService: NgbModal,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    console.log(
      "quizInp--> courseId:",
      this.quizInp.courseId,
      "sectionId: ",
      this.quizInp.sectionId,
      "quizIds: ",
      this.quizInp.quizIds
    );
    this.getQuiz();
  }

  changeIndex(number) {
    if (
      (this.index > 0 && number < 0) || //index must be greater than 0 at all times
      (this.index < this.questions.length && number > 0)
    ) {
      //index must be less than length of array
      this.index += number;
    }
  }

  getQuiz() {
    // TODO - Cache quiz and questions in local storage
    this.quizService
      .getQuizByCourseAndSection(
        this.quizInp.courseId,
        this.quizInp.sectionId,
        this.quizInp.quizIds
      )
      .subscribe((res) => {
        this.quiz = res;
        this.quizQuestionIds = this.quiz.acf.quiz_questions;
        console.log("quiz api res:", this.quiz);
        // TODO - make get questions call when user clicks on StartQuiz button??
        this.getQuestions();
      });
  }

  getQuestions() {
    this.quizService
      .getQuestionByCourseAndQuiz(
        this.quizInp.courseId,
        this.quizInp.quizIds,
        this.quizQuestionIds
      )
      .subscribe((res) => {
        this.questions = res;
        console.log("questions api res:", this.questions);
      });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    }); //scrollable:true
  }
}
