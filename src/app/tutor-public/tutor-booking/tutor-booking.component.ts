import { Component, OnInit } from "@angular/core";
import { CourseCategory } from "../../../../../pana-tutor-lib/model/course/category.interface";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";
import { MediaModel } from "../../../../../pana-tutor-lib/model/media-model.interface";
import { CategoryService } from "../../service/category.service";
import { TutorBookingService } from "../../service/tutor-booking.service";
import { TutorBookingRequest } from "../../../../../pana-tutor-lib/model/tutor/tutor-booking.interface";

@Component({
  selector: "app-tutor-book",
  templateUrl: "./tutor-booking.component.html",
  styleUrls: ["./tutor-booking.component.css"],
})
export class TutorBookingComponent implements OnInit {
  categories = [];
  courses = [];
  coursesCatId;
  isPageLoading = true;
  apiError = null;
  slectedCourse: Course;
  selectedCat: CourseCategory;
  step = 0;
  stepTitle = 'Select Category';
  packages;
  selectedPkg;
  yenePayUrl;

  constructor(private categoryService: CategoryService,
    private tutorBookingService: TutorBookingService) {
    }

  ngOnInit() {
    this.getCategories();
    // console.log(this.findCategory());
  }

  getCategories() {
    this.apiError = null;
    if(this.categories.length == 0) {
      this.categoryService
      .findCategories()
      .subscribe((data) => {
        this.categories = data;
        this.isPageLoading = false;
      }, err => {
        this.apiError = true;
      }, () => {
        this.isPageLoading = false;
      });
    }

  }

  onSelectCat(id){
    this.apiError = null;
    if(this.courses.length == 0 || this.coursesCatId != id) {
      this.isPageLoading = true;
      this.categoryService
        .findCoursesByCategory(id)
        .subscribe((data) => {
          this.courses = data;
          this.step = 1;
          this.stepTitle = 'Select Subject';
          this.coursesCatId = id;
          this.isPageLoading = false;
        }, err => {
          this.apiError = err.error? err.error.message: err.message;
        }, () => {
          this.isPageLoading = false;
        });
    } else {
      console.log('@this.courses::',this.courses)
      this.step = 1;
      this.refreshTitle();
    }
  }

  onSelectCourse(course){
    this.apiError = null;
    this.slectedCourse = course;
    this.isPageLoading = true;
    // TODO - check user eligiblity
    // TODO - save user preferences
    this.tutorBookingService.validateCourseBookingRequest(course.id)
      .subscribe((data) => {
        console.log('validateCourseBookingRequest res::', data)
        this.step = 2;
        this.stepTitle = 'Select Package';
        this.isPageLoading = false;
        this.packages = this.tutorBookingService.findPackages();
      }, err => {
        console.log('validateCourseBookingRequest err::', err)
        this.apiError = err.error? err.error.message: err.message;
      }, () => {
        this.isPageLoading = false;
      });
  }

  onSelectPackage(pkg){
    this.apiError = null;
    this.selectedPkg = pkg;
    console.log('onSelectPackage::', pkg)
    
    this.tutorBookingService.putTutorBookingRequest(this.slectedCourse.id, this.getTutorBookingRequest())
      .subscribe((data) => {
        console.log('putTutorBookingRequest res::', data)
        this.step = 3;
        this.stepTitle = 'Payment';
        this.isPageLoading = false;
        this.tutorBookingService.getPaymentLinks(this.getPaymentInfoGeneratorReq(data))
        .subscribe(d => {
          console.log('getPaymentLinks res::', d)
          this.yenePayUrl = d.yenePayUrl;
        });
      }, err => {
        console.log('putTutorBookingRequest err::', err)
        this.apiError = true;
      }, () => {
        this.isPageLoading = false;
      });
  }

  getTutorBookingRequest(): TutorBookingRequest{
    return {
      packageId: this.selectedPkg.id,
      course_id: this.slectedCourse.id,
    }
  }

  getPaymentInfoGeneratorReq(data){
    return {
      orderId: data.orderId,
      packageId: this.selectedPkg.id,
      course_id: this.slectedCourse.id,
      courseName: this.slectedCourse.title['raw']
    }
  }

  afterSelectPref(){
    // Go to payment page
    this.step = 4;
  }

  onNavigate(url){
    window.open(url, "_self");
    //window.open(url,'YpayWindow','width=600,height=450,toolbar=no,scrollbars=yes,resizable=yes,');
  }

  goToPrev(){
    if(this.step > 0)
      this.step = this.step -1;
    this.apiError = null;
    this.isPageLoading = false;
    this.refreshTitle();
  }

  refreshTitle(){
    if(this.step == 0)
      this.stepTitle = 'Select Category';
    else if(this.step == 1)
      this.stepTitle = 'Select Subject';
    else if(this.step == 2)
      this.stepTitle = 'Select Package';
    else if(this.step == 3)
      this.stepTitle = 'Payment';
  }

}

