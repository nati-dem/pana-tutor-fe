import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TutorProfileListComponent } from "./tutor-profile-list/tutor-profile-list.component";
import { TutorBookingComponent } from "./tutor-booking/tutor-booking.component";
import { from } from "rxjs";

const routes: Routes = [
  { path: "", component: TutorProfileListComponent },
  { path: "course/:courseId", component: TutorProfileListComponent },
  { path: "booking", component: TutorBookingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorPublicRoutingModule {}
