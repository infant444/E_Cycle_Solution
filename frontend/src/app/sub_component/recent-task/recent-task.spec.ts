import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTask } from './recent-task';

describe('RecentTask', () => {
  let component: RecentTask;
  let fixture: ComponentFixture<RecentTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
