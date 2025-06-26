import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetBaseNav } from './timesheet-base-nav';

describe('TimesheetBaseNav', () => {
  let component: TimesheetBaseNav;
  let fixture: ComponentFixture<TimesheetBaseNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetBaseNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetBaseNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
