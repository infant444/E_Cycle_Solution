import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheet } from './time-sheet';

describe('TimeSheet', () => {
  let component: TimeSheet;
  let fixture: ComponentFixture<TimeSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
