import { Component, OnInit } from "@angular/core";
import { CourseCategory } from "../../../../../pana-tutor-lib/model/course/category.interface";
import { Course } from "../../../../../pana-tutor-lib/model/course/course.interface";
import { MediaModel } from "../../../../../pana-tutor-lib/model/media-model.interface";
import { CategoryService } from "../../service/category.service";
import { TutorBookingService } from "../../service/tutor-booking.service";
import { from } from "rxjs";
import { EntityType } from "../../../../../pana-tutor-lib/enum/constants";
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
  apiError = false;
  slectedCourse: Course;
  selectedCat: CourseCategory;
  step = 0;
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
    if(this.categories.length == 0) {
      this.categoryService
      .findCategories()
      .subscribe((data) => {
        this.categories = data;
        this.isPageLoading = false;
      });
    }

  }

  goToPrev(){
    if(this.step > 0)
      this.step = this.step -1;
  }

  onSelectCat(id){
    if(this.courses.length == 0 || this.coursesCatId != id) {
      this.isPageLoading = true;
      this.categoryService
        .findCoursesByCategory(id)
        .subscribe((data) => {
          this.courses = data;
          this.step = 1;
          this.coursesCatId = id;
          this.isPageLoading = false;
        });
    } else {
      console.log('@this.courses::',this.courses)
      this.step = 1;
    }
  }

  onSelectCourse(course){
    this.slectedCourse = course;
    this.isPageLoading = true;
    // TODO - check user eligiblity
    // TODO - save user preferences
    this.tutorBookingService.getTutorBookingRequest(course.id)
    .subscribe((data) => {
      console.log('getTutorBookingRequest res::', data)
      //this.slectedCourse = data;
      this.step = 2;
      this.isPageLoading = false;
      this.packages = this.tutorBookingService.findPackages();
    }, err => {
      console.log('getTutorBookingRequest err::', err)
    });
  }

  onSelectPackage(pkg){
    this.selectedPkg = pkg;
    console.log('onSelectPackage::', pkg)
    const req: TutorBookingRequest = {
      packageId: pkg.id,
      course_id: this.slectedCourse.id,
    }
    this.tutorBookingService.putTutorBookingRequest(this.slectedCourse.id, req)
    .subscribe((data) => {
      console.log('putTutorBookingRequest res::', data)
      this.step = 3;
      this.isPageLoading = false;
      this.tutorBookingService.getPaymentLinks(this.getPaymentInfoGeneratorReq(data))
      .subscribe(d => {
        console.log('getPaymentLinks res::', d)
        this.yenePayUrl = d.yenePayUrl;
      });
    }, err => {
      console.log('putTutorBookingRequest err::', err)
    });
    
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

}

