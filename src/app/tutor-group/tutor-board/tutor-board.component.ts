import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
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
  groupsOfUserInCourse: any;
  tutorPosts: any;
  displayTutorPosts = false;
  groupIds: any = [];
  courseId: any;
  postStatus: any;
  postId: any;
  selectedTutorpost;
  editTutorPostForm;
  public tutorForm = new FormGroup({
    post_title: new FormControl("", [Validators.required]),
    post_content: new FormControl("", [Validators.required]),
    post_type: new FormControl(BoardPostType.assignment, [Validators.required]),
    points: new FormControl("", [Validators.required]),
    due_date: new FormControl(""),
    status: new FormControl(BoardPostStatus.published, [Validators.required]),
  });

  constructor(
    public router: Router,
    public _location: Location,
    private tutorBoardService: TutorBoardService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    super();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    super.setForm(this.tutorForm);
  }
  // currentRouter = this.router.url;
  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get("course-id");

    this.tutorBoardService
      .getGroupsOfUserInCourse(this.courseId)
      .subscribe((res) => {
        this.groupsOfUserInCourse = res;
        console.log("@groupsOfUserInCourse", this.groupsOfUserInCourse);

        this.groupsOfUserInCourse.forEach((groupOfUserInCourse) => {
          this.groupIds.push(groupOfUserInCourse.tutor_group_id);

          console.log("group Ids", this.groupIds);
        });
        console.log("@groupOfUsersInCourse", res);
        console.log("@groupOfUsersInCourse", this.groupIds);
        // TODO - review post status.. for instructor, should fetch draft as well
        this.getTutorPosts(this.groupIds, this.courseId, "published");
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

  showEditTutorPostModal(targetModal, tutorpost) {
    console.log("tutor post::", tutorpost);

    this.selectedTutorpost = tutorpost;
    console.log("selected post::", tutorpost);
    this.editTutorPostForm = new FormGroup({
      id: new FormControl(tutorpost.id, [Validators.required]),
      course_id: new FormControl(this.selectedTutorpost.course_id, [
        Validators.required,
      ]),
      group_ids: new FormControl(this.selectedTutorpost.group_ids, [
        Validators.required,
      ]),
      post_title: new FormControl(this.selectedTutorpost.post_title, [
        Validators.required,
      ]),
      post_content: new FormControl(this.selectedTutorpost.post_content, [
        Validators.required,
      ]),
      status: new FormControl(this.selectedTutorpost.status, [
        Validators.required,
      ]),
      post_type: new FormControl(this.selectedTutorpost.post_type, [
        Validators.required,
      ]),
      points: new FormControl(this.selectedTutorpost.points, [
        Validators.required,
      ]),
      due_date: new FormControl(this.selectedTutorpost.due_date),
    });
    this.openVerticallyCentered(targetModal);
  }

  getTutorPosts(groupId, courseId, postStatus) {
    this.tutorBoardService
      .getTutorBoardPost(groupId, courseId, postStatus)
      .subscribe((res) => {
        this.tutorPosts = res;

        this.tutorPosts.forEach((tutorpost) => {
          const date = new Date(tutorpost.post_date);

          const postdate = date.toDateString();
          tutorpost.post_date = postdate;
          tutorpost["isCollapsed"] = true;
          this.displayTutorPosts = true;
          console.log("post DAte", postdate);
        });
        console.log("tutor posts", this.tutorPosts);
      });
  }

  onSubmit() {
    let tutorBoardpostReq: BoardPostCreateRequest = this.mapFormData();
    console.log("tutorreq::", tutorBoardpostReq);

    this.tutorBoardService.upsertGroupPost(tutorBoardpostReq).subscribe(
      (res) => {
        this.tutorForm.reset();
        this.modalService.dismissAll();

        this.getTutorPosts(this.groupIds, this.courseId, "published");
        console.log("Tutorpost response", res);
      },
      (err) => {
        console.log("Tutorpost Error", err);
        this.formErrors.push(err.error.message);
        this.enableForm();
      }
    );
  }

  EditTutorBoardPost(postId) {
    console.log("EditTutorBoardPostFormSubmit::", this.editTutorPostForm.value);
    console.log("form id", this.editTutorPostForm.value.id);
    const req: BoardPostCreateRequest = this.getUpsertMemberInGroupForm(
      this.editTutorPostForm
    );

    if (postId === this.editTutorPostForm.value.id) {
      this.tutorBoardService.upsertGroupPost(req).subscribe(
        (res) => {
          this.modalService.dismissAll();

          this.getTutorPosts(this.groupIds, this.courseId, "published");
          console.log("tutor post is updated");
        },
        (err) => {
          console.log("Tutorpost Error", err);
          this.formErrors.push(err.error.message);
          this.enableForm();
        }
      );
    }
  }

  mapFormData(): BoardPostCreateRequest {
    return {
      course_id: this.courseId,
      group_ids: this.groupIds,
      points: this.tutorForm.value.points.trim(),
      post_title: this.tutorForm.value.post_title.trim(),
      post_content: this.tutorForm.value.post_content.trim(),
      post_type: this.tutorForm.value.post_type.trim(),
      status: this.tutorForm.value.status.trim(),
    };
  }
  getUpsertMemberInGroupForm(form): BoardPostCreateRequest {
    return {
      course_id: this.courseId,
      group_ids: this.groupIds,
      status: form.value.status,
      post_content: form.value.post_content,
      post_title: form.value.post_title,
      due_date: form.value.due_date,
      post_type: form.value.post_type,
    };
  }

  removeTutorPostByPostId(postId) {
    console.log("this post id", this.postId);
    this.tutorBoardService
      .removeTutorBoardPost(this.groupIds, postId, this.courseId)
      .subscribe((res) => {
        console.log("Deleted sucessfull");
        this.modalService.dismissAll();
        this.getTutorPosts(this.groupIds, this.courseId, "published");
      });
  }
}
