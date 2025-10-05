import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyProjectComponent } from './view-my-project.component';

describe('ViewMyProjectComponent', () => {
  let component: ViewMyProjectComponent;
  let fixture: ComponentFixture<ViewMyProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMyProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
