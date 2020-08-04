import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorGroupRoutingModule } from './tutor-group-routing.module';
import { TutorGroupAdminComponent } from './tutor-group-admin/tutor-group-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TutorBoardComponent } from './tutor-board/tutor-board.component';
import { TutorAssignComponent } from './tutor-assign/tutor-assign.component';
import {NgDompurifyModule} from '@tinkoff/ng-dompurify';

@NgModule({
  declarations: [
    TutorGroupAdminComponent,
    TutorBoardComponent, 
    TutorAssignComponent
  ],
  imports: [
    CommonModule,
    TutorGroupRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    NgDompurifyModule
  ],
  exports: [
    TutorGroupAdminComponent, 
    TutorBoardComponent,
    TutorAssignComponent
  ]
})
export class TutorGroupModule { }
