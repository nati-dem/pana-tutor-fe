import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorPublicRoutingModule } from './tutor-public-routing.module';
import { TutorProfileListComponent } from './tutor-profile-list/tutor-profile-list.component';
import { TutorBookingComponent } from './tutor-booking/tutor-booking.component';
import { TutorBookingSuccessComponent } from './tutor-booking-success/tutor-booking-success.component';

@NgModule({
  declarations: [TutorProfileListComponent, TutorBookingComponent, TutorBookingSuccessComponent],
  imports: [
    CommonModule,
    TutorPublicRoutingModule
  ]
})
export class TutorPublicModule { }
