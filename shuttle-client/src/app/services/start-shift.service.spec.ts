import { TestBed } from '@angular/core/testing';

import { StartShiftService } from './start-shift.service';

describe('StartShiftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StartShiftService = TestBed.get(StartShiftService);
    expect(service).toBeTruthy();
  });
});
