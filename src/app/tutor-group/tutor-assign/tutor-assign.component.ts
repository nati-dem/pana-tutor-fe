import { Component, OnInit } from '@angular/core';
import { TutorAdminService } from "../../service/tutor-admin.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TutorCreateRequest } from "../../../../../pana-tutor-lib/model/tutor/tutor-admin.interface";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-tutor-assign',
  templateUrl: './tutor-assign.component.html',
  styleUrls: ['./tutor-assign.component.css']
})
export class TutorAssignComponent implements OnInit {

  courseId:number;
  tutors;
  formSubmitError;
  tutorAssignForm;
  dataLoading = true;

  constructor(private tutorAdminService: TutorAdminService,
    private route: ActivatedRoute,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initTutorAssignForm();
    this.courseId = +this.route.snapshot.paramMap.get("course-id");
    this.getTutorsInCourse(this.courseId);
  }

  initTutorAssignForm(): void{
    this.tutorAssignForm = new FormGroup({
      user_id: new FormControl('', [Validators.required])
    });
  }

  getTutorsInCourse(courseId){
    this.dataLoading = true;
    this.tutorAdminService.getTutorsInCourse(courseId)
      .subscribe(res => {
        console.log('getTutorsInCourse res::', res)
        this.tutors = res;
        this.dataLoading = false;
      });
  }

  onTutorAssignFormSubmit(){
    console.log('tutorAssignForm::', this.tutorAssignForm.value)
    // TODO - validate FORM
    const req : TutorCreateRequest = this.getTutorAssignFormData();
    this.tutorAdminService.assignTutorInCourse(req)
      .subscribe(res => {
        console.log('assignTutorInCourse res::', res)
        this.getTutorsInCourse(this.courseId);
        this.closeModal();
      }, err => {
        this.formSubmitError = err;
        console.log('assignTutorInCourse err::',err)
      });
  }

  getTutorAssignFormData(): TutorCreateRequest{
    return {
      course_id: this.courseId,
      user_id: this.tutorAssignForm.value.user_id
    };
  }

  openVerticallyCentered(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      size: "xl",
      backdrop: "static",
      keyboard: false,
    });
  }

  closeModal(){
    this.modalService.dismissAll();
    this.resetAll();
  }

  resetAll(){
    this.initTutorAssignForm();
    this.formSubmitError = null;
  }

  onUserSearchEvent(user){
    console.log('event emitted, user::', user)
    if(user){
      this.tutorAssignForm.patchValue({ user_id: user.user_id });
    } else {
      this.tutorAssignForm.patchValue({user_id: ''});
    }
  }

  removeTutor(user){
    this.tutorAdminService.removeTutorFromCourse(this.courseId, user.user_id)
    .subscribe(res => {
      console.log('removeTutorFromCourse res::', res)
      this.getTutorsInCourse(this.courseId);
    }, err => {
      console.log('removeTutorFromCourse err::',err)
    });
  }

}
