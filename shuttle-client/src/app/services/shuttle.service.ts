import { Injectable, ElementRef } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { ShuttleDayDetails } from '../models/record-passengers.model';
import { SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';

import { Day } from '../models/day.model';

@Injectable()
export class ShuttleService {
  currentShuttleMarkers: any;


  constructor(private shuttleApi: ShuttleApiService, private datePipe: DatePipe,) {


   }
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
    this.shuttleApi.responseForVehicleOptions().subscribe(vehicleDropDown =>{
      this._vehicleDropDown.next(ShuttleService.buildSelectItemsForDropdown(vehicleDropDown, 'vehicleName', 'id'));
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

  createShuttleDayDetails(_vehicleId: number, _passengerCount: number, _curbCount: number, passengerDate: string) {
    const shuttleDayDetails: ShuttleDayDetails = {
      vehicleId: _vehicleId,
      passengerCount: _passengerCount,
      curbCount: _curbCount,
      date: passengerDate
    };
    this.shuttleApi.sendShuttleDayDetails(shuttleDayDetails).subscribe();
  }



  
   stopListenForShuttleMarkers(sub: Subscription) {
    if (sub) {
      sub.unsubscribe();
    }
  }

  



}
