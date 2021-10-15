import {TestBed} from '@angular/core/testing';

import { StartShiftService } from './start-shift.service';
import {CacheService} from "./cache.service";
import {ShuttleService} from "./shuttle.service";

describe('StartShiftService', () => {
  let startShiftService: StartShiftService;
  let mockShuttleService;
  let mockCacheService;
  let dateString = '10/15/2021'

  beforeEach(() => {
    mockShuttleService = jasmine.createSpyObj(['getDate'])
    mockCacheService = jasmine.createSpyObj(['getCache', 'putCache'])
    TestBed.configureTestingModule({
      providers: [
        {provide: CacheService, useValue: mockCacheService},
        {provide: ShuttleService, useValue: mockShuttleService}
      ]
    });
    startShiftService = TestBed.get(StartShiftService)
    mockShuttleService.getDate.and.returnValue(dateString);
    mockCacheService.getCache.and.returnValue(dateString);
  });

  it('should be created', () => {
    expect(startShiftService).toBeTruthy();
  });

  it('should get the date on Init and call cacheService', (done) => {
    startShiftService.ngOnInit()
    done();
    expect(startShiftService.dateToday).toEqual(dateString)
    expect(mockCacheService.putCache).toHaveBeenCalledTimes(1)
  })

  it('should return true when saved today date matches the current date', () =>{
    const response = startShiftService.startShiftExistsToday()

    expect(response).toEqual(true)
    expect(mockCacheService.getCache).toHaveBeenCalledTimes(2)
  })
});
