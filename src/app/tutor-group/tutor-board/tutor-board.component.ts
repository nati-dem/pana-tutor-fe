import { Component, OnInit } from "@angular/core";
import { TutorBoardService } from "../../service/tutor-board.service";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-tutor-board",
  templateUrl: "./tutor-board.component.html",
  styleUrls: ["./tutor-board.component.css"],
})
export class TutorBoardComponent implements OnInit {
  public isCollapsed = true;
  courseId;

  constructor(
    private tutorBoardService: TutorBoardService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

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
}
