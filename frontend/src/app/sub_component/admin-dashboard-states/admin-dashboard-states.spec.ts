import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardStates } from './admin-dashboard-states';

describe('AdminDashboardStates', () => {
  let component: AdminDashboardStates;
  let fixture: ComponentFixture<AdminDashboardStates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardStates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardStates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
