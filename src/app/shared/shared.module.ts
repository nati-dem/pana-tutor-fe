import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormValidationTemplateComponent } from "./form-validation-template/form-validation-template.component";
import { APIErrorTemplateComponent } from "./api-error-template/api-error-template.component";

@NgModule({
  declarations: [
    FormValidationTemplateComponent,
    APIErrorTemplateComponent
  ],
  imports: [CommonModule],
  exports: [
    FormValidationTemplateComponent,
    APIErrorTemplateComponent
  ]
})
export class SharedModule {}
