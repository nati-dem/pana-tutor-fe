import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TutorProfileListComponent } from "./tutor-profile-list/tutor-profile-list.component";
import { TutorSessionComponent } from "./tutor-session.component";
import { from } from "rxjs";

const routes: Routes = [
  { path: "", component: TutorSessionComponent },
  { path: "tutor-profile", component: TutorProfileListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorSessionRoutingModule {}
