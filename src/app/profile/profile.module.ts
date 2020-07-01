import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbProgressbarModule } from "@ng-bootstrap/ng-bootstrap";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileDashboardComponent } from "./dashboard/profile-dashboard.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ProfileWrapperComponent } from "./profile-wrapper/profile-wrapper.component";
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileDashboardComponent,
    ProfileEditComponent,
    ChangePasswordComponent,
    ProfileWrapperComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgbProgressbarModule,
    SharedModule,
    ReactiveFormsModule],
})
export class ProfileModule {}
