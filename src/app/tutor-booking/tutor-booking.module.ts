import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorBookingRoutingModule } from './tutor-booking-routing.module';
import { TutorBookingComponent } from './tutor-booking.component';


@NgModule({
  declarations: [TutorBookingComponent],
  imports: [
    CommonModule,
    TutorBookingRoutingModule
  ]
})
export class TutorBookingModule { }
