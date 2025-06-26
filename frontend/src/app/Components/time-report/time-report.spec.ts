import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeReport } from './time-report';

describe('TimeReport', () => {
  let component: TimeReport;
  let fixture: ComponentFixture<TimeReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
