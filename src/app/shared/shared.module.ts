import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormValidationTemplateComponent } from "./form-validation-template/form-validation-template.component";
import { APIErrorTemplateComponent } from "./api-error-template/api-error-template.component";
import { UserSearchFormComponent } from "./user-search-form/user-search-form.component";

@NgModule({
  declarations: [
    FormValidationTemplateComponent,
    APIErrorTemplateComponent,
    UserSearchFormComponent
  ],
  imports: [CommonModule],
  exports: [
    FormValidationTemplateComponent,
    APIErrorTemplateComponent,
    UserSearchFormComponent
  ]
})
export class SharedModule {}
