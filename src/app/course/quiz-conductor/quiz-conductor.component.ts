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
import { element } from "protractor";

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
  quizInt: any; // where is this being used?
  quizInitId = null;
  submitedQuiz: any;
  quizInitData = []; // revisit usage
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
  }

  changeIndex(number) {
    this.submitAnswer();

    if (
      (this.index > 0 && number < 0) || //index must be greater than 0 at all times
      (this.index < this.questions.length && number > 0)
    ) {
      //index must be less than length of array

      this.index += number;
      //this.quizform.controls["answer"].patchValue(this.quizform.value.answer);
      //this.quizform.controls["answer"].reset();

      const ansInMemory = this.questions[this.index]["ansInMemory"];
      if (ansInMemory) {
        console.log(
          "patching ans @Qindex",
          this.index,
          " && ansInMemory:",
          ansInMemory
        );
        this.quizform.controls["answer"].patchValue(ansInMemory);
      } else {
        console.log("resetting form");
        this.quizform.controls["answer"].reset();
      }
    }
  }

  radioChangHandler(event: any) {
    this.selectedOption = event.target.value;
    this.checked = true;
    console.log("this.selectedOption", this.selectedOption);
  }

  getquizIntByid() {
    this.quizService.getQuizInt(this.quizInp.quizIds).subscribe((res) => {
      this.quizInitData = res;
      const found = this.quizInitData.find(
        (element) => element.quiz_id == this.quiz.id
      );

      this.quizService.storeSubmitedQuestionInCache(
        this.quizInitData,
        this.quizInp.quizIds,
        this.quizInitId // TODO - replace with this.quizInitId
      );
    });
  }

  submitAnswer() {
    console.log("submitAnswer::form values", this.quizform.value);
    let req = {
      que_id: this.questions[this.index].id,
      answer: this.quizform.value.answer,
      quiz_init_id: this.quizInitId,
      instructor_feedback: null,
      marked_for_review: YesNoChoice.yes,
    };

    if (req.answer != null) {
      // store in memory
      this.questions[this.index]["ansInMemory"] = req.answer;
      this.quizService.submitQuizAns(req).subscribe((res) => {
        this.submitedAnswer = res;
        console.log("Submited answer", this.submitedAnswer);
      });
    }
  }

  submitQuiz() {
    console.log("submitting quiz..");
    let req: QuizSubmission = {
      answer: this.quizform.value.answer,
      que_id: this.questions[this.index].id,
      quiz_init_id: this.quizInitId,
      marked_for_review: YesNoChoice.no,
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
      this.quizInitId = res[0].id;
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
