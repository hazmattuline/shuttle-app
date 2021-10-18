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
  let vehicleId = 2;
  let cache;




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

    cache = {
      'startShiftCache': dateString,
      'today' : dateString,
      'vehicle' : vehicleId
    };

    mockCacheService.getCache.and.callFake(function(key){
      return cache[key]
    });
  });

  it('should be created', () => {
    expect(startShiftService).toBeTruthy();
  });

  it('should call cacheService on init', () => {
    expect(mockCacheService.putCache).toHaveBeenCalledTimes(1)
  })

  it('should return true when saved today date matches the current date', () =>{

    const response = startShiftService.startShiftExistsToday(vehicleId)

    expect(response).toEqual(true)
    expect(mockCacheService.getCache).toHaveBeenCalledTimes(3)
  })

  it('should return false when saved date does not match current date', () => {
    cache['startShiftCache'] = '10/17/2021'

    const response = startShiftService.startShiftExistsToday(vehicleId)

    expect(response). toEqual(false)
  })

  it('should return false when saved vehicle does not match current vehicle', () =>{
    const response = startShiftService.startShiftExistsToday(vehicleId+1)

    expect(response). toEqual(false)
  })
});
