import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOverview } from './task-overview';

describe('TaskOverview', () => {
  let component: TaskOverview;
  let fixture: ComponentFixture<TaskOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
