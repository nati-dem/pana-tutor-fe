import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TutorGroupAdminComponent } from "./tutor-group-admin/tutor-group-admin.component";
import { TutorBookingComponent } from "./tutor-booking/tutor-booking.component";
import { from } from "rxjs";

const routes: Routes = [
  //{ path: "", component: TutorProfileListComponent },
  //{ path: "admin/:courseId", component: TutorGroupAdminComponent },
  { path: "booking", component: TutorBookingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorGroupRoutingModule {}
