import { TestBed } from '@angular/core/testing';

import { GPSService } from './gps.service';

describe('GPSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GPSService = TestBed.get(GPSService);
    expect(service).toBeTruthy();
  });
});
