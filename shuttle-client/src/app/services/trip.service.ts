import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Trip} from "../models/trip.model";
import {ShuttleApiService} from "./shuttle-api.service";
import {CacheService} from "./cache.service";

@Injectable({
  providedIn: 'root'
})
export class TripService implements OnInit {
  ngOnInit(): void {
    this.initializeTripCache();
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  tripCacheKey = "tripCache";
  isCaching = false;

  constructor(private shuttleApi:ShuttleApiService, private cacheService:CacheService) {
  }

  async processCachedTrips() {

    if (this.isCaching) {
      return;
    }

    this.isCaching = true; //used to prevent multiple of these from running at once.

    this.initializeTripCache();

    let tripCache = this.cacheService.getCache(this.tripCacheKey);
    let conLost = false;

    let onSuccess = (tripKey) => {
      this.cacheService.removeCache(tripKey);
      tripCache.shift();
    }

    let onFail = () => conLost = true;

    while (!conLost && tripCache.length) {

      let tripKey = tripCache.shift();
      tripCache.unshift(tripKey);

      let tripInfo = this.cacheService.getCache(tripKey);

      //Submitting trips while processing cache can cause nulls, this recovers
      if (tripInfo == null) {
        tripCache.shift()
        await this.sleep(100);
        continue;
      }
      if (!tripInfo.isUpdate){
        this.createTrip(tripInfo.shuttleId,
          tripInfo.passengerNumber, tripInfo.curbNumber, tripInfo.route.id, tripInfo.date, tripInfo.activityTimestamp)
          .subscribe
          (success => { onSuccess(tripKey)
            },
            err => {
              onFail();
            }
          )
      } else {
        this.modifyTrip(tripInfo.loadedRowId, tripInfo.passengerNumber, tripInfo.curbNumber, tripInfo.route.id)
          .subscribe
          (success => { onSuccess(tripKey);
            },
            err => {
              onFail();
            })
      }
      await this.sleep(100);
    }
    this.cacheService.putCache(this.tripCacheKey, tripCache);
    this.isCaching = false;
  }

  saveToTripCache(key, value){
    let tripCache = this.cacheService.getCache(this.tripCacheKey)
    this.cacheService.putCache(key, value);
    tripCache.push(key)
    this.cacheService.putCache(this.tripCacheKey, tripCache);
  }

  nowCaching(): boolean {
    return this.isCaching;
  }

  getTripCacheKey(): string {
    return this.tripCacheKey;
  }

  exists(key:string){
    return this.cacheService.getCache(key);
  }

  update(key:string, value:any){
    this.cacheService.putCache(key,value);
  }

  initializeTripCache(): void{
    let tripCache = this.cacheService.getCache(this.tripCacheKey);
    if (tripCache == null){
      tripCache= new Array<string>();
      this.cacheService.putCache(this.tripCacheKey, tripCache);
    }
  }

  createTrip(tripVehicleId: number, tripPassengers: number, tripCurb: number, tripRouteId: number, tripDate: string, tripTime: string): Observable<Trip> {
    const trip: Trip = {
      vehicleId: tripVehicleId,
      passengerCount: tripPassengers,
      curbCount: tripCurb,
      date: tripDate,
      routeId: tripRouteId,
      activityTimestamp: tripTime
    };
    return this.shuttleApi.submitTrip(trip);
  }

  modifyTrip(tripId: number, tripPassengers: number, tripCurb: number, tripRouteId: number): Observable<Trip> {
    const trip: Trip = {
      passengerCount: tripPassengers,
      curbCount: tripCurb,
      id: tripId,
      routeId: tripRouteId
    };
    return this.shuttleApi.submitTrip(trip);
  }
}

