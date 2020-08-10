import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TutorProfileListComponent } from "./tutor-profile-list/tutor-profile-list.component";
import { TutorBookingComponent } from "./tutor-booking/tutor-booking.component";
import { TutorBookingSuccessComponent } from "./tutor-booking-success/tutor-booking-success.component";

const routes: Routes = [
  //{ path: "tutors", component: TutorProfileListComponent },
  //{ path: "course/:courseId", component: TutorProfileListComponent },
  { path: "booking", component: TutorBookingComponent },
  { path: "booking/:courseId/success", component: TutorBookingSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorPublicRoutingModule {}
