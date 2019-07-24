import { Injectable, ElementRef } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { Trip } from '../models/trip.model';
import { SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';

import { Day } from '../models/day.model';
import { DayComment } from '../models/day-comment.model';
import { Shuttle } from '../models/shuttle.model';

@Injectable()
export class ShuttleService {

  constructor(private shuttleApi: ShuttleApiService, private datePipe: DatePipe) {}
  myDate = new Date();
  vehicleValue: Shuttle;
  disabled: boolean = true;
  startMileage: number;

  static getDateISOStringForDate(date: Date): string | undefined {
    if (date) {
      return date.toLocaleDateString();
    }
    return undefined;
  }

   getDate(){
    return ShuttleService.getDateISOStringForDate(this.myDate);
   }

  createStartInfo(driverId: number, startVehicleId: number, mileage: number, condition: string, startDate: string) {
    const day: Day = {
      vehicleId: startVehicleId,
      startMileage: mileage,
      startCondition: condition,
      date: startDate
    };
    this.shuttleApi.submitDay(day).subscribe();
  }

  createCommentInfo(commentVehicleId: number, commentDate: string, commentMessage: string) {
    const comment: DayComment = {
      vehicleId: commentVehicleId,
      date: commentDate,
      message: commentMessage
    };
    this.shuttleApi.sendComment(comment).subscribe();
  }

    createEndInfo(driverId: number, endVehicleId: number, mileage: number, condition: string,
                  quantity: number, cost: number, endDate: string) {
    const day: Day = {
      vehicleId: endVehicleId,
      endMileage: mileage,
      endCondition: condition,
      date: endDate,
      fuelCost: cost,
      fuelQuantity: quantity
    };
    this.shuttleApi.submitDay(day).subscribe();
  }


    vehicleOptions(value) {
    this.shuttleApi.getVehicleOptions(value).subscribe(vehicles =>{this.setVehicles(vehicles);
    });
  }

  getDayInfo(date, vehicleId){
    this.shuttleApi.getDayInfo(date, vehicleId).subscribe(dayInfo =>{this.setMileage(dayInfo)},
    err => {this.startMileage = 0.0;});
  }

  setMileage(dayInfo){

    if(dayInfo.startMileage === null){
      this.startMileage = 0.0;
    } else
    this.startMileage = dayInfo.startMileage;
  }

  getMileage(){
    return this.startMileage;
  }

  setVehicles(vehicles){
    this.vehicleValue = vehicles;
  }
  getVehicles(){
    return this.vehicleValue;
  }

  createFuelInfo(quantity: number, cost: number, fuelDate: string, fuelVehicleId: number ) {
    const day: Day = {
      date: fuelDate,
      vehicleId: fuelVehicleId,
      fuelCost: cost,
      fuelQuantity: quantity
    }
    this.shuttleApi.submitDay(day).subscribe();
  }

  createTrip(tripVehicleId: number, tripPassengers: number, tripCurb: number, tripDate: string) {
    const trip: Trip = {
      vehicleId: tripVehicleId,
      passengerCount: tripPassengers,
      curbCount: tripCurb,
      date: tripDate
    };
    this.shuttleApi.submitTrip(trip).subscribe();
  }
}
