import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyMeetingComponent } from './view-my-meeting.component';

describe('ViewMyMeetingComponent', () => {
  let component: ViewMyMeetingComponent;
  let fixture: ComponentFixture<ViewMyMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyMeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMyMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
