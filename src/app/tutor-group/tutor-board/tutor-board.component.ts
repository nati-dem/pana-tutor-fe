import { Component, OnInit } from "@angular/core";
import { TutorBoardService } from "../../service/tutor-board.service";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseFormGroup } from "../../shared/base-form-group";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  BoardPostCreateRequest,
  BoardPostStatus,
  BoardPostType,
} from "../../../../../pana-tutor-lib/model/tutor/tutor-board.interface";

@Component({
  selector: "app-tutor-board",
  templateUrl: "./tutor-board.component.html",
  styleUrls: ["./tutor-board.component.css"],
})
export class TutorBoardComponent extends BaseFormGroup implements OnInit {
  public isCollapsed = true;
  public isCollapsed2 = true;
  GroupsOfUserInCourse: any;
  tutorPosts: any;
  groupIds = [];
  courseId: any;
  public tutorForm = new FormGroup({
    post_title: new FormControl("", [Validators.required]),
    post_content: new FormControl("", [Validators.required]),
    post_type: new FormControl(BoardPostType.assignment, [Validators.required]),
    points: new FormControl("", [Validators.required]),
    due_date: new FormControl(""),
    status: new FormControl(BoardPostStatus.published, [Validators.required]),
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
        // var group_ids = [];
        this.GroupsOfUserInCourse = res;
        this.GroupsOfUserInCourse.forEach((groupOfUserInCourse, index) => {
          console.log(
            "groupOfUsersInCourse",
            groupOfUserInCourse.tutor_group_id
          );

          this.groupIds.push(groupOfUserInCourse.tutor_group_id);

          console.log("group Ids", this.groupIds);
        });

        this.getTutorPosts(this.groupIds);
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

  getTutorPosts(groupId) {
    this.tutorBoardService.getTutorBoardPost(groupId).subscribe((res) => {
      this.tutorPosts = res;
      console.log("tutor posts", this.tutorPosts);
    });
  }

  onSubmit() {
    console.warn(this.tutorForm.value);
    let tutorBoardpostReq: BoardPostCreateRequest = this.mapFormData();
    this.disableForm();
    this.tutorBoardService.upsertGroupPost(tutorBoardpostReq).subscribe(
      (res) => {
        this.tutorForm.reset();
        console.log("Tutorpost response", res);
      },
      (err) => {
        console.log("Tutorpost Error", err);
        this.formErrors.push(err.error.message);
        this.enableForm();
      }
    );
  }

  mapFormData(): BoardPostCreateRequest {
    return {
      course_id: this.courseId,
      points: this.tutorForm.value.points.trim(),
      post_title: this.tutorForm.value.post_title.trim(),
      post_content: this.tutorForm.value.post_content.trim(),
      post_type: this.tutorForm.value.post_type.trim(),
      status: this.tutorForm.value.status.trim(),
      group_ids: this.groupIds,
    };
  }
}
