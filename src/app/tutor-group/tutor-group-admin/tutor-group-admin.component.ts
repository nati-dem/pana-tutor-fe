import { Component, OnInit } from '@angular/core';
import { GroupAdminService } from "../../service/group-admin.service";
import { UserService } from "../../service/user.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TutorGroupCreate, 
  GroupsInCourseResponse,
  GroupMemberRequest } from "../../../../../pana-tutor-lib/model/tutor/tutor-group.interface";
import { GroupStatus,GroupMemberStatus } from "../../../../../pana-tutor-lib/enum/tutor.enum";
import { TutorGroupRole } from "../../../../../pana-tutor-lib/enum/user.enum";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-tutor-group-admin',
  templateUrl: './tutor-group-admin.component.html',
  styleUrls: ['./tutor-group-admin.component.css']
})
export class TutorGroupAdminComponent implements OnInit {

  courseId:number;
  groups: GroupsInCourseResponse;
  selectedGroup;
  formSubmitError;
  createGroupForm;
  addMemberInGroupForm;
  editMemberInGroupForm;
  selectedMember;
  dataLoading = true;

  constructor(private groupAdminService: GroupAdminService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.initCreateGroupForm();
    this.initAddMemberInGroupForm();
    this.courseId = +this.route.snapshot.paramMap.get("course-id");
    this.getGroupsInCourse(this.courseId);
  }

  initCreateGroupForm(): void{
    this.createGroupForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      user_id: new FormControl('', [Validators.required]),
      user_role:new FormControl(TutorGroupRole.instructor, [Validators.required]),
      status:new FormControl(GroupMemberStatus.active, [Validators.required]),
    });
  }

  initAddMemberInGroupForm() : void{
    this.addMemberInGroupForm = new FormGroup({
      user_id: new FormControl('', [Validators.required]),
      user_role:new FormControl(TutorGroupRole.subscriber, [Validators.required]),
      status:new FormControl(GroupMemberStatus.active, [Validators.required]),
    });
  }

  getGroupsInCourse(courseId){
    this.dataLoading = true;
    this.groupAdminService.getGroupsInCourse(courseId)
      .subscribe(res => {
        console.log('getGroupsInCourse res::', res)
        this.groups = res;
        this.dataLoading = false;
      });
  }

  onCreateGroupFormSubmit(){
    console.log('createGroupForm::', this.createGroupForm.value)
    // TODO - validate FORM
    const req : TutorGroupCreate = this.getCreateGroupForm();
    this.groupAdminService.createGroup(req)
      .subscribe(res => {
        console.log('createGroup res::', res)
        this.getGroupsInCourse(this.courseId);
        this.closeModal();
      }, err => {
        this.formSubmitError = err;
        console.log('createGroup err::',err)
      });
  }

  getCreateGroupForm(): TutorGroupCreate{
    return {
      course_id: this.courseId,
      start_date: this.createGroupForm.value.start_date,
      status: GroupStatus.active,
      owner: {
        user_id: this.createGroupForm.value.user_id,
        user_role: this.createGroupForm.value.user_role, //TutorGroupRole.instructor,
        status: this.createGroupForm.value.status, //GroupMemberStatus.active
      }
    };
  }

  onAddMemberInGroupFormSubmit(){
    console.log('addMemberInGroupForm::', this.addMemberInGroupForm.value)
    // TODO - validate FORM
    const req: GroupMemberRequest = this.getUpsertMemberInGroupForm(this.addMemberInGroupForm);
    this.groupAdminService.upsertMemberInGroup(req)
      .subscribe(res => {
        console.log('upsertMemberInGroup res::', res);
        this.getGroupsInCourse(this.courseId);
        this.closeModal();
      }, err => {
        this.formSubmitError = err;
        console.log('upsertMemberInGroup err::',err)
      });
  }

  onEditMemberInGroupFormSubmit(){
    console.log('onEditMemberInGroupFormSubmit::', this.editMemberInGroupForm.value)
    // TODO - validate FORM
    const req: GroupMemberRequest = this.getUpsertMemberInGroupForm(this.editMemberInGroupForm);
    this.groupAdminService.upsertMemberInGroup(req)
      .subscribe(res => {
        console.log('upsertMemberInGroup res::', res);
        this.getGroupsInCourse(this.courseId);
        // TODO - only close edit form modal
        this.closeModal();
      }, err => {
        this.formSubmitError = err;
        console.log('upsertMemberInGroup err::',err)
      });
  }

  getUpsertMemberInGroupForm(form): GroupMemberRequest{
    return {
      course_id: this.courseId,
      tutor_group_id:this.selectedGroup.groupId,
      user_id: form.value.user_id,
      user_role: form.value.user_role, 
      status: form.value.status, 
    };
  }

  showGroupInModal(targetModal, grp:any){
    console.log('grp::', grp)
    this.selectedGroup = grp;
    this.openVerticallyCentered(targetModal)
  }

  showEditGroupMemberModal(targetModal, member, grpId?){
    console.log('member::', member)
    //this.selectedGroup = grp;
    this.selectedMember = member;
    this.editMemberInGroupForm = new FormGroup({
      user_id: new FormControl(member.user_id, [Validators.required]),
      user_role:new FormControl(member.user_role, [Validators.required]),
      status:new FormControl(member.member_status, [Validators.required]),
    });
    this.openVerticallyCentered(targetModal)
  }

  openVerticallyCentered(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      size: "xl",
      backdrop: "static",
      keyboard: false,
    }); //scrollable:true
  }

  closeModal(){
    this.modalService.dismissAll();
    this.resetAll();
  }

  closeEditMemberModal(modal){
    this.selectedMember = null;
    modal.dismiss();
  }

  resetAll(){
    this.initCreateGroupForm();
    this.initAddMemberInGroupForm();
    this.formSubmitError = null;
  }

  onUserSearchEvent(user){
    console.log('event emitted, user::', user)
    if(user){
      this.createGroupForm.patchValue({ user_id: user.user_id });
      this.addMemberInGroupForm.patchValue({ user_id: user.user_id });
    } else {
      this.createGroupForm.patchValue({user_id: ''});
      this.addMemberInGroupForm.patchValue({user_id: ''});
    }
  }

}
