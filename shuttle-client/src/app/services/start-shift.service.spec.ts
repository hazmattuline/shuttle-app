import {TestBed} from '@angular/core/testing';

import { StartShiftService } from './start-shift.service';
import {CacheService} from "./cache.service";
import {ShuttleService} from "./shuttle.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('StartShiftService', () => {
  let startShiftService: StartShiftService;
  let shuttleService: ShuttleService
  let mockCacheService;
  let dateString;

  beforeEach(() => {
    mockCacheService = jasmine.createSpyObj(['getCache', 'putCache'])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: CacheService, useValue: mockCacheService},
        ShuttleService,
      ]
    });
    startShiftService = TestBed.get(StartShiftService)
    shuttleService = TestBed.get(ShuttleService)
    dateString = shuttleService.getDate()
    mockCacheService.getCache.and.returnValue(dateString);
  });

  it('should be created', () => {
    expect(startShiftService).toBeTruthy();
  });

  it('should call cacheService on init', () => {
    expect(mockCacheService.putCache).toHaveBeenCalledTimes(1)
  })

  it('should return true when saved today date matches the current date', () =>{
    const response = startShiftService.startShiftExistsToday()

    expect(response).toEqual(true)
    expect(mockCacheService.getCache).toHaveBeenCalledTimes(2)
  })
});
