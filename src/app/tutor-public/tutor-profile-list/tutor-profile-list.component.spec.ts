import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfileListComponent } from './tutor-profile-list.component';

describe('TutorProfileListComponent', () => {
  let component: TutorProfileListComponent;
  let fixture: ComponentFixture<TutorProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorProfileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
