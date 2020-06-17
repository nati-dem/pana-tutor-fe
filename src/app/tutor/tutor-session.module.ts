import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorSessionRoutingModule } from './tutor-session-routing.module';
import { TutorSessionComponent } from './tutor-session.component';
import { TutorProfileListComponent } from './tutor-profile-list/tutor-profile-list.component';


@NgModule({
  declarations: [TutorSessionComponent, TutorProfileListComponent],
  imports: [
    CommonModule,
    TutorSessionRoutingModule
  ]
})
export class TutorSessionModule { }
