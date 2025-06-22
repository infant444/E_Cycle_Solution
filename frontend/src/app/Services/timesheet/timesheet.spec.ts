import { TestBed } from '@angular/core/testing';

import { Timesheet } from './timesheet';

describe('Timesheet', () => {
  let service: Timesheet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Timesheet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
