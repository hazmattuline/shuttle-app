import {Injectable} from '@angular/core';

import {CacheService} from "./cache.service";
import {startShiftCacheKey} from "../core/constants/cacheKey.constant";
import {ShuttleService} from "./shuttle.service";

@Injectable({
  providedIn: 'root'
})
export class StartShiftService{

  todayKey: string = 'today'

  initializeCache(): void {
        let date = this.shuttleService.getDate()
        if (date) {
          this.cacheService.putCache(this.todayKey, date)
        }
    }

  constructor(private cacheService: CacheService,
              private shuttleService: ShuttleService) {
    this.initializeCache()
  }

  saveStartShiftDate():void{
    let date = this.shuttleService.getDate()
    this.cacheService.putCache(startShiftCacheKey, date)
  }

  startShiftExistsToday():boolean{
    let lastDate = this.cacheService.getCache(startShiftCacheKey);
    console.log(lastDate)
    let todayDate = this.cacheService.getCache(this.todayKey)
    console.log(todayDate)

    return lastDate && todayDate && lastDate === todayDate;

  }
}
