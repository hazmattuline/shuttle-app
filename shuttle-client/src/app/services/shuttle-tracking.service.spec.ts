import { TestBed } from '@angular/core/testing';

import { ShuttleTrackingService } from './shuttle-tracking.service';

describe('ShuttleTrackingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShuttleTrackingService = TestBed.get(ShuttleTrackingService);
    expect(service).toBeTruthy();
  });
});
