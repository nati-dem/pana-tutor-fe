import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileDashboardComponent } from "./dashboard/profile-dashboard.component";

const routes: Routes = [{ path: "", component: ProfileDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
