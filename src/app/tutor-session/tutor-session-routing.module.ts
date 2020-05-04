import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorSessionComponent } from './tutor-session.component';

const routes: Routes = [{ path: '', component: TutorSessionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorSessionRoutingModule { }
