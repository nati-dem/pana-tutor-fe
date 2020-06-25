import { Component, OnInit, Input } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { QuizService } from "../../service/quiz.service";
import { Quiz } from "../../../../../pana-tutor-lib/model/course/quiz.interface";
import { Question } from "../../../../../pana-tutor-lib/model/course/question.interface";
import { QuizAnsEntry } from "../../../../../pana-tutor-lib/model/course/quiz-ans-entry.interface";
import { QuizInit } from "../../../../../pana-tutor-lib/model/course/quiz-init.interface";
import { YesNoChoice } from "../../../../../pana-tutor-lib/enum/common.enum";
import { QuizSubmission } from "../../../../../pana-tutor-lib/model/course/quiz-submission.interface";

@Component({
  selector: "app-quiz-conductor",
  templateUrl: "./quiz-conductor.component.html",
  styleUrls: ["./quiz-conductor.component.css"],
})
export class QuizConductorComponent implements OnInit {
  quizform = new FormGroup({});
  form: FormGroup;
  selectedOption: string = "";
  @Input() quizInp: any;
  quiz: Quiz;
  quizQuestionIds;
  questions: Question[];
  // answer = [];
  submitedAnswer: QuizAnsEntry;
  radioSelected: string;
  index = 0;
  quizInt: any;
  submitedQuiz: any;
  quizInitData = [];
  checked: boolean = false;

  constructor(
    private modalService: NgbModal,
    private quizService: QuizService,
    private formBuilder: FormBuilder
  ) {
    this.radioSelected = "";
    this.quizform = this.formBuilder.group({
      answer: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(
      "quizInp--> courseId:",
      this.quizInp.courseId,
      "sectionId: ",
      this.quizInp.sectionId,
      "quizIds: ",
      this.quizInp.quizIds
    );
    this.getquizIntByid();
    this.getQuiz();
    // this.getquizIntByid();

    this.getQuestions();
    // this.getQuiz();
  }

  changeIndex(number) {
    this.submitAnswer();

    if (
      (this.index > 0 && number < 0) || //index must be greater than 0 at all times
      (this.index < this.questions.length && number > 0)
    ) {
      //index must be less than length of array

      this.index += number;

      this.quizform.controls["answer"].reset();
    }
  }
  radioChangHandler(event: any) {
    this.selectedOption = event.target.value;
    this.checked = true;
    console.log(this.selectedOption);
  }

  getquizIntByid() {
    this.quizService.getQuizInt(this.quizInp.quizIds).subscribe((res) => {
      this.quizInitData = res;
    });
  }

  submitAnswer() {
    console.log("get Quizinp from int", this.quizInitData);

    console.log("quiz from get quiz", this.quiz);
    console.log("Question from get questio", this.questions[this.index].id);

    console.log("form values", this.quizform.value);

    const found = this.quizInitData.find(
      (element) => element.quiz_id == this.quiz.id
    );

    let req = {
      que_id: this.questions[this.index].id,
      answer: this.quizform.value.answer,
      quiz_init_id: found.initId,
      instructor_feedback: null,
      marked_for_review: YesNoChoice.yes,
    };
    if (this.quizform.value != null) {
      this.quizService.submitQuizAns(req).subscribe((res) => {
        this.submitedAnswer = res;
        console.log("Submited answer", this.submitedAnswer);
      });
    }
  }

  submitQuiz() {
    const found = this.quizInitData.find(
      (element) => element.quiz_id == this.quiz.id
    );
    let req: QuizSubmission = {
      answer: found.answers,
      que_id: this.questions[this.index].id,
      quiz_init_id: found.initId,
      marked_for_review: YesNoChoice.yes,
      instructor_feedback: null,
      instructor_id: null,
    };
    this.quizService.submitQuiz(req).subscribe((res) => {
      this.submitedQuiz = res;
      console.log("submited quiz ", this.submitedQuiz);
    });
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
        this.quizService.storeQuizInCache(res, this.quizInp.quizIds);
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
        this.quizService.storeQuizQuestionsInCache(res, this.quizInp.quizIds);
      });
  }

  mapQuizIntData(): QuizInit {
    this.getQuiz();
    return {
      quiz_id: this.quiz.id,
      enrollment_id: 3,
      timer: this.quiz.acf.time_limit,
    };
  }

  openVerticallyCentered(content) {
    let quizIntreq: QuizInit = this.mapQuizIntData();
    this.quizService.startQuiz(quizIntreq).subscribe((res) => {
      this.quizInt = res;
      console.log("quizstart", res);
    });
    this.modalService.open(content, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });

    //scrollable:true
  }
}
