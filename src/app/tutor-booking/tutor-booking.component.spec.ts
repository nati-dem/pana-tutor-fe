import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorBookingComponent } from './tutor-booking.component';

describe('TutorBookingComponent', () => {
  let component: TutorBookingComponent;
  let fixture: ComponentFixture<TutorBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
