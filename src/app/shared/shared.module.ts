import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidationTemplateComponent } from './form-validation-template/form-validation-template.component';

@NgModule({
  declarations: [
    FormValidationTemplateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormValidationTemplateComponent
  ]
})
export class SharedModule { }
