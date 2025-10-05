import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyTaskComponent } from './view-my-task.component';

describe('ViewMyTaskComponent', () => {
  let component: ViewMyTaskComponent;
  let fixture: ComponentFixture<ViewMyTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
