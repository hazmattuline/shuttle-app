import { TestBed } from '@angular/core/testing';

import { RecordStartService } from './record-start.service';

describe('RecordStartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordStartService = TestBed.get(RecordStartService);
    expect(service).toBeTruthy();
  });
});
