import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopClients } from './top-clients';

describe('TopClients', () => {
  let component: TopClients;
  let fixture: ComponentFixture<TopClients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopClients]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopClients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
