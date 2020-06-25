import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormValidationTemplateComponent } from "./form-validation-template/form-validation-template.component";
import { APIErrorTemplateComponent } from "./api-error-template/api-error-template.component";
import { UserSearchFormComponent } from "./user-search-form/user-search-form.component";
import { UserProfileViewComponent } from "./user-profile-view/user-profile-view.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FormValidationTemplateComponent,
    APIErrorTemplateComponent,
    UserSearchFormComponent,
    UserProfileViewComponent
  ],
  imports: [CommonModule, NgbModule],
  exports: [
    FormValidationTemplateComponent,
    APIErrorTemplateComponent,
    UserSearchFormComponent,
    UserProfileViewComponent
  ]
})
export class SharedModule {}
