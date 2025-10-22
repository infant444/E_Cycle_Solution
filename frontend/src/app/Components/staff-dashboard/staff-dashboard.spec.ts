import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDashboard } from './staff-dashboard';

describe('StaffDashboard', () => {
  let component: StaffDashboard;
  let fixture: ComponentFixture<StaffDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
