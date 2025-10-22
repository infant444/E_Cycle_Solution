import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOverview } from './client-overview';

describe('ClientOverview', () => {
  let component: ClientOverview;
  let fixture: ComponentFixture<ClientOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
