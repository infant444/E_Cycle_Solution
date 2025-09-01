import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProject } from './add-project';

describe('AddProject', () => {
  let component: AddProject;
  let fixture: ComponentFixture<AddProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
