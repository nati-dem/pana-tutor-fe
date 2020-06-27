import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";
import { CategoryService } from "../../service/category.service";
import { CourseService } from "../../service/course.service";
import { Location } from "@angular/common";
import { GlobalService } from "../../service/global.service";
import { UserRole } from "../../../../../pana-tutor-lib/enum/user.enum";

@Component({
  selector: 'app-course-home',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  selectedCourse: Course;
  closeResult: string;
  sections: any;
  selectedSection: any;
  selectedLesson: any;
  apiError: any;
  page = 'topics';
  courseId;
  userId;
  pageLinks = [];
  isAdmin = false;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private courseService: CourseService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.page = params.page;
    });
    this.courseId = +this.route.snapshot.paramMap.get("course-id");
    this.getCourseSummary(this.courseId);
  }

  getCourseSummary(id) {
    console.log("@getCourseSummary course-id: ", id);
    this.categoryService.getCourseSummary(id)
    .subscribe((res) => {
      console.log("@getCourseSummary resp: ", res);
      this.selectedCourse = res;
      this.getGlobalUserAuthInfo();
    });
  }

  getGlobalUserAuthInfo = async () =>{
    console.log('GlobalService userID:', GlobalService.userId)
    this.userId = GlobalService.userId;
    for (let i = 1; i <= 5; i++) {
      await this.sleep(500);
      this.userId = GlobalService.userId;
      console.log('waited global user info: ' + i + ' -->'+ this.userId);
      if(this.userId)
        break;
    }
    if(this.userId){
      this.generatePageLinks();
    }
  }

  generatePageLinks(){
    const courses = GlobalService.courses
    const userRole = GlobalService.userRole
    const groupFound = courses.find(
      (c) => c.course_id == this.courseId && c.groups.length > 0
    );
    
    this.pageLinks.push({page: 'overview', text: 'Overview'})
    this.pageLinks.push({page: 'topics', text: 'Topics'})
    if(groupFound){
      this.pageLinks.push({page: 'board', text: 'Tutorial'})
    }
    if(userRole === UserRole.ADMINISTRATOR){
      this.pageLinks.push({page: 'group-admin', text: 'Group Admin'})
      this.isAdmin = true;
    }
  }

  sleep = (ms=500) => new Promise(resolve => setTimeout(resolve, ms))

  getRouterLink(){
    return `/course/home/${this.courseId}`;
  }

}
