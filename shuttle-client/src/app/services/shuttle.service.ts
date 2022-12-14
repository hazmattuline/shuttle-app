import { Injectable, Optional } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { Trip } from '../models/trip.model';
import { Day } from '../models/day.model';
import { DayComment } from '../models/day-comment.model';
import {  Observable } from 'rxjs';
import { TripDisplay } from '../trips/trips.component';
import { GPSService } from './gps.service';
import { switchMap, map } from 'rxjs/operators';
import {CacheService} from "./cache.service";

@Injectable()
export class ShuttleService {
  constructor(private shuttleApi: ShuttleApiService, private cacheService: CacheService, @Optional() private gpsService: GPSService) {
  }

  date = new Date();
  isAccordionTopDisabled = true;
  activeIndex: number = null;
  startMileage: number;
  isEndOfDayDisabled = true;
  isShuttleActive: boolean;
  previousDriverTrip: TripDisplay = null;

  static getDateISOStringForDate(date: Date): string | undefined {
    if (date) {
      return date.toLocaleDateString();
    }
    return undefined;
  }

  getDate() {
    return ShuttleService.getDateISOStringForDate(this.date);
  }

  createStartInfo(startVehicleId: number, mileage: number, condition: string, startDate: string, comments: string, isCommentDisabled: boolean): Observable<Day> {
    const day: Day = {
      vehicleId: startVehicleId,
      startMileage: mileage,
      startCondition: condition,
      date: startDate
    };
    return this.shuttleApi.submitDay(day);
  }

  createCommentInfo(commentVehicleId: number, commentDate: string, commentMessage: string) {
    const comment: DayComment = {
      vehicleId: commentVehicleId,
      date: commentDate,
      message: commentMessage
    };
    this.shuttleApi.sendComment(comment).subscribe();
  }

  createEndInfo(endVehicleId: number, mileage: number, condition: string,
                quantity: number, cost: number, endDate: string, comments: string, isCommentDisabled: boolean): Observable<Day> {
    const day: Day = {
      vehicleId: endVehicleId,
      endMileage: mileage,
      endCondition: condition,
      date: endDate,
      fuelCost: cost,
      fuelQuantity: quantity
    };
    return this.shuttleApi.submitDay(day);
  }

  getDayInfo(date, vehicleId) {
    this.shuttleApi.getDayInfo(date, vehicleId).subscribe(dayInfo => {
        this.setMileage(dayInfo);
      },
      err => {
        this.startMileage = 0.0;
      });
  }

  loadPreviousDriverInfo(): Observable<Trip> {
    return this.gpsService.shuttleIdObservable.pipe(
      switchMap((vehicleId => this.shuttleApi.getTrip(this.getDate(), this.gpsService.getShuttleId())
        .pipe(map(trip => trip)))));
  }

  setMileage(dayInfo) {
    if (dayInfo[0].startMileage === null) {
      this.startMileage = null;
    } else {
      this.startMileage = dayInfo[0].startMileage;
    }
  }

  getMileage() {
    return this.startMileage;
  }

  setActiveIndex(num:number){
    this.activeIndex = num;
  }
}
