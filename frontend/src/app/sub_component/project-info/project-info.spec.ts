import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfo } from './project-info';

describe('ProjectInfo', () => {
  let component: ProjectInfo;
  let fixture: ComponentFixture<ProjectInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
