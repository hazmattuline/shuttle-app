import { Injectable } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { Trip } from '../models/trip.model';
import { DatePipe } from '@angular/common';
import { Day } from '../models/day.model';
import { DayComment } from '../models/day-comment.model';
import { Shuttle } from '../models/shuttle.model';
import { Subscription, Observable } from 'rxjs';

@Injectable()
export class ShuttleService {
  constructor(private shuttleApi: ShuttleApiService, private datePipe: DatePipe) {}
  date = new Date();
  vehicleValue: Shuttle;
  isAccordionTopDisabled = true;
  startMileage: number;
  isEndOfDayDisabled = true;
  isShuttleActive: boolean; 

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
                  quantity: number, cost: number, endDate: string, comments: string, isCommentDisabled: boolean ): Observable<Day> {
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
    this.shuttleApi.getDayInfo(date, vehicleId).subscribe(dayInfo => {this.setMileage(dayInfo); },
    err => {this.startMileage = 0.0; });
  }

  setMileage(dayInfo) {
    if (dayInfo.startMileage === null) {
      this.startMileage = 0.0;
    } else {
      this.startMileage = dayInfo.startMileage;
    }
  }

  getMileage() {
    return this.startMileage;
  }



  createTrip(tripVehicleId: number, tripPassengers: number, tripCurb: number, tripRouteId: number, tripDate: string): Observable<Trip> {
    const trip: Trip = {
      vehicleId: tripVehicleId,
      passengerCount: tripPassengers,
      curbCount: tripCurb,
      date: tripDate,
      routeId: tripRouteId,
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
