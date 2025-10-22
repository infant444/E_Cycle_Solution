import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTimesheets } from './pending-timesheets';

describe('PendingTimesheets', () => {
  let component: PendingTimesheets;
  let fixture: ComponentFixture<PendingTimesheets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingTimesheets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingTimesheets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
