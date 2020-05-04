import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorSessionRoutingModule } from './tutor-session-routing.module';
import { TutorSessionComponent } from './tutor-session.component';


@NgModule({
  declarations: [TutorSessionComponent],
  imports: [
    CommonModule,
    TutorSessionRoutingModule
  ]
})
export class TutorSessionModule { }
