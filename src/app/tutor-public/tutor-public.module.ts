import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorPublicRoutingModule } from './tutor-public-routing.module';
import { TutorProfileListComponent } from './tutor-profile-list/tutor-profile-list.component';
import { TutorBookingComponent } from './tutor-booking/tutor-booking.component';

@NgModule({
  declarations: [TutorProfileListComponent, TutorBookingComponent],
  imports: [
    CommonModule,
    TutorPublicRoutingModule
  ]
})
export class TutorPublicModule { }
