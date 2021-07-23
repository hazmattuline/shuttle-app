import {Injectable, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {Trip} from "../models/trip.model";
import {ShuttleApiService} from "./shuttle-api.service";

@Injectable({
  providedIn: 'root'
})
export class CacheService implements OnInit {
    ngOnInit(): void {
        this.initializeTripCache();
    }

    sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  //tripCache: Array<string>
  tripCacheKey = "tripCache";
  isCaching = false;

  constructor(private messageService: MessageService, private shuttleApi:ShuttleApiService) {
  }

  async processCache() {

    if (this.isCaching) {
      return;
    }

    this.isCaching = true; //used to prevent multiple of these from running at once.

    this.initializeTripCache();

    let tripCache = this.getCache(this.tripCacheKey);
    let conLost = false;

    let onSuccess = (tripKey) => {
        this.removeCache(tripKey);
        tripCache.shift();
      }

    let onFail = () => conLost = true;

    while (!conLost && tripCache.length) {

      let tripKey = tripCache.shift();
      tripCache.unshift(tripKey);

      let tripInfo = this.getCache(tripKey);

      //Submitting trips while processing cache can cause nulls, this recovers
      if (tripInfo == null) {
        tripCache.shift()
        await this.sleep(100);
        continue;
      }
      if (!tripInfo.isUpdate){
        this.createTrip(tripInfo.shuttleId,
          tripInfo.passengerNumber, tripInfo.curbNumber, tripInfo.routeId, tripInfo.date, tripInfo.activityTimestamp)
          .subscribe
        (success => { onSuccess(tripKey)
          },
          err => {
            onFail();
          }
        )
      } else {
        this.modifyTrip(tripInfo.loadedRowId, tripInfo.passengerNumber, tripInfo.curbNumber, tripInfo.routeId)
          .subscribe
          (success => { onSuccess(tripKey);
            },
            err => {
              onFail();
            })
      }
      await this.sleep(100);
    }
    this.putCache(this.tripCacheKey, tripCache);
    this.isCaching = false;
  }

  saveToTripCache(key, value){
    let tripCache = this.getCache(this.tripCacheKey)
    this.putCache(key, value);
    tripCache.push(key)
    this.putCache(this.tripCacheKey, tripCache);
  }

  putCache(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  removeCache(key: string): void {
    localStorage.removeItem(key);
  }

  nowCaching(): boolean {
    return this.isCaching;
  }

  getTripCacheKey(): string {
    return this.tripCacheKey;
  }

  initializeTripCache(): void{
    let tripCache = this.getCache(this.tripCacheKey);
    if (tripCache == null){
      tripCache= new Array<string>();
      this.putCache(this.tripCacheKey, tripCache);
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

