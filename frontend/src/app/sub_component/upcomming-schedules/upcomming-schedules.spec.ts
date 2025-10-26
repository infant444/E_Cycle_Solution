import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcommingSchedules } from './upcomming-schedules';

describe('UpcommingSchedules', () => {
  let component: UpcommingSchedules;
  let fixture: ComponentFixture<UpcommingSchedules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcommingSchedules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcommingSchedules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
