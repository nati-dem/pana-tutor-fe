import { Component, OnInit } from "@angular/core";
import { TutorBoardService } from "../../service/tutor-board.service";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseFormGroup } from "../../shared/base-form-group";
import { FormGroup, FormControl } from "@angular/forms";
import {
  BoardPostCreateRequest,
  BoardPostStatus,
} from "../../../../../pana-tutor-lib/model/tutor/tutor-board.interface";

@Component({
  selector: "app-tutor-board",
  templateUrl: "./tutor-board.component.html",
  styleUrls: ["./tutor-board.component.css"],
})
export class TutorBoardComponent extends BaseFormGroup implements OnInit {
  public isCollapsed = true;
  public isCollapsed2 = true;
  courseId;
  public tutorForm = new FormGroup({
    topic: new FormControl(),
    for: new FormControl(),
    duedate: new FormControl(),
    student: new FormControl(),
    points: new FormControl(),
  });

  constructor(
    private tutorBoardService: TutorBoardService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    super();
    console.log("inside tutorPost const");
    super.setForm(this.tutorForm);
  }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get("course-id");
    this.tutorBoardService
      .getGroupsOfUserInCourse(this.courseId)
      .subscribe((res) => {
        console.log("getGroupsOfUserInCourse res:", res);
      });
  }

  openVerticallyCentered(targetModal) {
    this.modalService.open(targetModal, {
      centered: false,
      size: "xl",
      backdrop: "static",
      keyboard: false,
    }); //scrollable:true
  }

  onSubmit() {
    console.warn(this.tutorForm.value);
    let signupReq: BoardPostCreateRequest = this.mapFormData();
    this.disableForm();
  }

  mapFormData(): BoardPostCreateRequest {
    return {
      course_id: this.courseId,
      post_title: null,
      post_content: null,
      post_type: null,
      status: BoardPostStatus.draft,
      group_ids: null,
    };
  }
}
