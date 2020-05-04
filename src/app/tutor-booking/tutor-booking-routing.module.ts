import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorBookingComponent } from './tutor-booking.component';

const routes: Routes = [{ path: '', component: TutorBookingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorBookingRoutingModule { }
