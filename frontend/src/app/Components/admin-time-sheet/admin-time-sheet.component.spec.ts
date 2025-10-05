import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTimeSheetComponent } from './admin-time-sheet.component';

describe('AdminTimeSheetComponent', () => {
  let component: AdminTimeSheetComponent;
  let fixture: ComponentFixture<AdminTimeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTimeSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTimeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
