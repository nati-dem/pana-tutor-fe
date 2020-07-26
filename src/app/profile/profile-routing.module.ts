import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//import { ProfileDashboardComponent } from "./dashboard/profile-dashboard.component";
//import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
//import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ProfileWrapperComponent } from "./profile-wrapper/profile-wrapper.component";

const routes: Routes = [
  { path: "", component: ProfileWrapperComponent },
  //{ path: 'edit', component: ProfileEditComponent },
  //{ path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
