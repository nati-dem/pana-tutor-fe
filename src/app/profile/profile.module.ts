import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbProgressbarModule } from "@ng-bootstrap/ng-bootstrap";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileDashboardComponent } from "./dashboard/profile-dashboard.component";

@NgModule({
  declarations: [ProfileDashboardComponent],
  imports: [CommonModule, ProfileRoutingModule, NgbProgressbarModule],
})
export class ProfileModule {}
