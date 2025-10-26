import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeSales } from './make-sales';

describe('MakeSales', () => {
  let component: MakeSales;
  let fixture: ComponentFixture<MakeSales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeSales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeSales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
