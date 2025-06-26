import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentWorks } from './recent-works';

describe('RecentWorks', () => {
  let component: RecentWorks;
  let fixture: ComponentFixture<RecentWorks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentWorks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentWorks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
