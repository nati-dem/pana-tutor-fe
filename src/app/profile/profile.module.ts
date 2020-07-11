import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbProgressbarModule } from "@ng-bootstrap/ng-bootstrap";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileDashboardComponent } from "./dashboard/profile-dashboard.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ProfileWrapperComponent } from "./profile-wrapper/profile-wrapper.component";
import { ChangeAvatarComponent } from "./change-avatar/change-avatar.component";
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    ProfileDashboardComponent,
    ProfileEditComponent,
    ChangePasswordComponent,
    ProfileWrapperComponent,
    ChangeAvatarComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgbProgressbarModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule
  ],
})
export class ProfileModule {}
