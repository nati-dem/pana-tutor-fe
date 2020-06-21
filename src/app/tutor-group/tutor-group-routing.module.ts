import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TutorGroupAdminComponent } from "./tutor-group-admin/tutor-group-admin.component";
import { from } from "rxjs";

const routes: Routes = [
  //{ path: "", component: TutorProfileListComponent },
  //{ path: "admin/:courseId", component: TutorGroupAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorGroupRoutingModule {}
