import {Injectable, OnInit} from '@angular/core';

import {CacheService} from "./cache.service";
import {startShiftCacheKey} from "../core/constants/cacheKey.constant";
import {ShuttleService} from "./shuttle.service";

@Injectable({
  providedIn: 'root'
})
export class StartShiftService implements OnInit{

  todayKey: string = 'today'
  dateToday: string | null = null

  ngOnInit(): void {
        this.dateToday = this.shuttleService.getDate()
        this.cacheService.putCache(this.todayKey, this.dateToday)
    }

  constructor(private cacheService: CacheService, private shuttleService: ShuttleService) {
  }

  saveStartShiftDate():void{
    let date = this.shuttleService.getDate()
    this.cacheService.putCache(startShiftCacheKey, date)
  }

  startShiftExistsToday():boolean{
    let lastDate = this.cacheService.getCache(startShiftCacheKey);
    let todayDate = this.cacheService.getCache(this.todayKey)

    if (lastDate && todayDate && lastDate === todayDate){
      return true;
    }
    return false;
  }
}
