import { TestBed } from '@angular/core/testing';

import { ShuttleApiService } from './shuttle-api.service';

describe('ShuttleApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShuttleApiService = TestBed.get(ShuttleApiService);
    expect(service).toBeTruthy();
  });
});
