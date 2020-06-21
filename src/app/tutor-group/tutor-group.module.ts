import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorGroupRoutingModule } from './tutor-group-routing.module';
import { TutorGroupAdminComponent } from './tutor-group-admin/tutor-group-admin.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TutorGroupAdminComponent],
  imports: [
    CommonModule,
    TutorGroupRoutingModule,
    ReactiveFormsModule
  ],
  exports: [TutorGroupAdminComponent]
})
export class TutorGroupModule { }
