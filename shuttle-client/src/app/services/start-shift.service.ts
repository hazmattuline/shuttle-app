import {Injectable} from '@angular/core';

import {CacheService} from "./cache.service";
import {startShiftCacheKey} from "../core/constants/cacheKey.constant";
import {ShuttleService} from "./shuttle.service";

@Injectable({
  providedIn: 'root'
})
export class StartShiftService{

  todayKey: string = 'today'
  vehicleKey: string = 'vehicle'

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

  saveStartShiftDate(vehicleId:number):void{
    let date = this.shuttleService.getDate()
    this.cacheService.putCache(startShiftCacheKey, date)
    this.cacheService.putCache(this.vehicleKey, vehicleId)
  }

  startShiftExistsToday(vehicleId:number):boolean{
    let lastDate = this.cacheService.getCache(startShiftCacheKey);
    let todayDate = this.cacheService.getCache(this.todayKey)
    let lastVehicle = this.cacheService.getCache((this.vehicleKey))

    //makes sure the date is today and that the vehicleId matches
    return lastDate && todayDate && (lastDate === todayDate) && (lastVehicle === vehicleId);

  }
}
