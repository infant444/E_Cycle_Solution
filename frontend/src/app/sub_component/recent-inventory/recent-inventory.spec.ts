import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentInventory } from './recent-inventory';

describe('RecentInventory', () => {
  let component: RecentInventory;
  let fixture: ComponentFixture<RecentInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentInventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
