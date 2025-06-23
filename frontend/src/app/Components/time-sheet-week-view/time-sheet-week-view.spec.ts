import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetWeekView } from './time-sheet-week-view';

describe('TimeSheetWeekView', () => {
  let component: TimeSheetWeekView;
  let fixture: ComponentFixture<TimeSheetWeekView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSheetWeekView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSheetWeekView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
