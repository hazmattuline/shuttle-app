import { Injectable, ElementRef } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { Trip } from '../models/trip.model';
import { SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';

import { Day } from '../models/day.model';
import { DayComment } from '../models/day-comment.model';

@Injectable()
export class ShuttleService {

  constructor(private shuttleApi: ShuttleApiService, private datePipe: DatePipe) {}
  myDate = new Date();
  date: string;
  
  private _vehicleDropDown: Subject<SelectItem[]> = new Subject();
  public vehicleDropDown: Observable<SelectItem[]> = this._vehicleDropDown.asObservable();
  
  static getDateISOStringForDate(date: Date): string | undefined {
    if (date) {
      return date.toLocaleDateString();
    }
    return undefined;
  }

   static buildSelectItemsForDropdown(data: any[], labelFieldName: string, valueFieldName?: string): SelectItem[] {
    let selectItems = [];
    if (data && data.length > 0) {
      selectItems = data.map(dataItem => {
        return {label: dataItem[labelFieldName], value: valueFieldName ? dataItem[valueFieldName] : dataItem};
      });
  
      selectItems.unshift({label: '', value: null});
    }
    return selectItems;
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
    console.log(day);
  }

  createCommentInfo(commentVehicleId: number, commentDate: string, commentMessage: string) {
    const comment: DayComment = {
      vehicleId: commentVehicleId,
      date: commentDate,
      message: commentMessage
    }
    this.shuttleApi.sendComment(comment).subscribe();
  }

    createEndInfo(driverId: number, endVehicleId: number, mileage: number, condition: string, endDate: string) {
    const day: Day = {
      vehicleId: endVehicleId,
      endMileage: mileage,
      endCondition: condition,
      date: endDate
    };
    this.shuttleApi.submitDay(day).subscribe();
  }
    vehicleOptions() {
    this.shuttleApi.getVehicleOptions().subscribe(vehicleDropDown =>{
      this._vehicleDropDown.next(ShuttleService.buildSelectItemsForDropdown(vehicleDropDown, 'name', 'vehicleID'));
    });
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
    console.log(trip);
    this.shuttleApi.submitTrip(trip).subscribe();
  }

  modifyTrip(tripId: number, tripPassengers: number, tripCurb: number) {
    const trip: Trip = {
      passengerCount: tripPassengers,
      curbCount: tripCurb,
      id: tripId
    };
    this.shuttleApi.submitTrip(trip).subscribe();
  }


  
}
